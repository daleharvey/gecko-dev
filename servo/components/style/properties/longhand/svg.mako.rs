/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

<%namespace name="helpers" file="/helpers.mako.rs" />

<% data.new_style_struct("SVG", inherited=False, gecko_name="SVGReset") %>

// TODO: Which of these should be animatable properties?
${helpers.single_keyword("dominant-baseline",
                 """auto use-script no-change reset-size ideographic alphabetic hanging
                    mathematical central middle text-after-edge text-before-edge""",
                 products="gecko",
                 animation_value_type="none",
                 spec="https://www.w3.org/TR/SVG11/text.html#DominantBaselineProperty")}

${helpers.single_keyword("vector-effect", "none non-scaling-stroke",
                         products="gecko", animation_value_type="none",
                         spec="https://www.w3.org/TR/SVGTiny12/painting.html#VectorEffectProperty")}

// Section 13 - Gradients and Patterns

${helpers.predefined_type(
    "stop-color", "CSSColor",
    "CSSParserColor::RGBA(RGBA::new(0, 0, 0, 255))",
    products="gecko",
    animation_value_type="none",
    spec="https://www.w3.org/TR/SVGTiny12/painting.html#StopColorProperty")}

${helpers.predefined_type("stop-opacity", "Opacity", "1.0",
                          products="gecko",
                          animation_value_type="none",
                          spec="https://www.w3.org/TR/SVGTiny12/painting.html#propdef-stop-opacity")}

// Section 15 - Filter Effects

${helpers.predefined_type(
    "flood-color", "CSSColor",
    "CSSParserColor::RGBA(RGBA::new(0, 0, 0, 255))",
    products="gecko",
    animation_value_type="none",
    spec="https://www.w3.org/TR/SVG/filters.html#FloodColorProperty")}

${helpers.predefined_type("flood-opacity", "Opacity",
                          "1.0", products="gecko", animation_value_type="none",
                          spec="https://www.w3.org/TR/SVG/filters.html#FloodOpacityProperty")}

${helpers.predefined_type(
    "lighting-color", "CSSColor",
    "CSSParserColor::RGBA(RGBA::new(255, 255, 255, 255))",
    products="gecko",
    animation_value_type="none",
    spec="https://www.w3.org/TR/SVG/filters.html#LightingColorProperty")}

// CSS Masking Module Level 1
// https://drafts.fxtf.org/css-masking
${helpers.single_keyword("mask-type", "luminance alpha",
                         products="gecko", animation_value_type="none",
                         spec="https://drafts.fxtf.org/css-masking/#propdef-mask-type")}

${helpers.predefined_type("clip-path", "basic_shape::ShapeWithGeometryBox",
                          "generics::basic_shape::ShapeSource::None",
                          products="gecko", boxed="True",
                          animation_value_type="none", flags="CREATES_STACKING_CONTEXT",
                          spec="https://drafts.fxtf.org/css-masking/#propdef-clip-path")}

${helpers.single_keyword("mask-mode",
                         "match-source alpha luminance",
                         vector=True,
                         products="gecko",
                         animation_value_type="none",
                         spec="https://drafts.fxtf.org/css-masking/#propdef-mask-mode")}

<%helpers:vector_longhand name="mask-repeat" products="gecko" animation_value_type="none" extra_prefixes="webkit"
                          spec="https://drafts.fxtf.org/css-masking/#propdef-mask-repeat">
    pub use properties::longhands::background_repeat::single_value::parse;
    pub use properties::longhands::background_repeat::single_value::SpecifiedValue;
    pub use properties::longhands::background_repeat::single_value::computed_value;
    pub use properties::longhands::background_repeat::single_value::RepeatKeyword;
    use properties::longhands::background_repeat::single_value;

    #[inline]
    pub fn get_initial_value() -> computed_value::T {
        computed_value::T(RepeatKeyword::NoRepeat, RepeatKeyword::NoRepeat)
    }

    #[inline]
    pub fn get_initial_specified_value() -> SpecifiedValue {
        SpecifiedValue::Other(RepeatKeyword::NoRepeat, None)
    }
</%helpers:vector_longhand>

<%helpers:vector_longhand name="mask-position-x" products="gecko"
                          animation_value_type="ComputedValue" extra_prefixes="webkit"
                          spec="https://drafts.fxtf.org/css-masking/#propdef-mask-position">
    pub use properties::longhands::background_position_x::single_value::get_initial_value;
    pub use properties::longhands::background_position_x::single_value::get_initial_position_value;
    pub use properties::longhands::background_position_x::single_value::get_initial_specified_value;
    pub use properties::longhands::background_position_x::single_value::parse;
    pub use properties::longhands::background_position_x::single_value::SpecifiedValue;
    pub use properties::longhands::background_position_x::single_value::computed_value;
    use properties::animated_properties::{ComputeDistance, Interpolate, RepeatableListInterpolate};
    use properties::longhands::mask_position_x::computed_value::T as MaskPositionX;

    impl Interpolate for MaskPositionX {
        #[inline]
        fn interpolate(&self, other: &Self, progress: f64) -> Result<Self, ()> {
            Ok(MaskPositionX(try!(self.0.interpolate(&other.0, progress))))
        }
    }

    impl RepeatableListInterpolate for MaskPositionX {}

    impl ComputeDistance for MaskPositionX {
        #[inline]
        fn compute_distance(&self, _other: &Self) -> Result<f64, ()> {
            Err(())
        }
    }
</%helpers:vector_longhand>

<%helpers:vector_longhand name="mask-position-y" products="gecko"
                          animation_value_type="ComputedValue" extra_prefixes="webkit"
                          spec="https://drafts.fxtf.org/css-masking/#propdef-mask-position">
    pub use properties::longhands::background_position_y::single_value::get_initial_value;
    pub use properties::longhands::background_position_y::single_value::get_initial_position_value;
    pub use properties::longhands::background_position_y::single_value::get_initial_specified_value;
    pub use properties::longhands::background_position_y::single_value::parse;
    pub use properties::longhands::background_position_y::single_value::SpecifiedValue;
    pub use properties::longhands::background_position_y::single_value::computed_value;
    use properties::animated_properties::{ComputeDistance, Interpolate, RepeatableListInterpolate};
    use properties::longhands::mask_position_y::computed_value::T as MaskPositionY;

    impl Interpolate for MaskPositionY {
        #[inline]
        fn interpolate(&self, other: &Self, progress: f64) -> Result<Self, ()> {
            Ok(MaskPositionY(try!(self.0.interpolate(&other.0, progress))))
        }
    }

    impl RepeatableListInterpolate for MaskPositionY {}

    impl ComputeDistance for MaskPositionY {
        #[inline]
        fn compute_distance(&self, _other: &Self) -> Result<f64, ()> {
            Err(())
        }
    }
</%helpers:vector_longhand>

${helpers.single_keyword("mask-clip",
                         "border-box content-box padding-box",
                         extra_gecko_values="fill-box stroke-box view-box no-clip",
                         vector=True,
                         products="gecko",
                         extra_prefixes="webkit",
                         animation_value_type="none",
                         spec="https://drafts.fxtf.org/css-masking/#propdef-mask-clip")}

${helpers.single_keyword("mask-origin",
                         "border-box content-box padding-box",
                         extra_gecko_values="fill-box stroke-box view-box",
                         vector=True,
                         products="gecko",
                         extra_prefixes="webkit",
                         animation_value_type="none",
                         spec="https://drafts.fxtf.org/css-masking/#propdef-mask-origin")}

<%helpers:longhand name="mask-size" products="gecko" animation_value_type="ComputedValue" extra_prefixes="webkit"
                   spec="https://drafts.fxtf.org/css-masking/#propdef-mask-size">
    use properties::longhands::background_size;
    pub use ::properties::longhands::background_size::SpecifiedValue;
    pub use ::properties::longhands::background_size::single_value as single_value;
    pub use ::properties::longhands::background_size::computed_value as computed_value;

    #[inline]
    pub fn get_initial_value() -> computed_value::T {
        background_size::get_initial_value()
    }

    pub fn parse(context: &ParserContext, input: &mut Parser) -> Result<SpecifiedValue,()> {
        background_size::parse(context, input)
    }
</%helpers:longhand>

${helpers.single_keyword("mask-composite",
                         "add subtract intersect exclude",
                         vector=True,
                         products="gecko",
                         extra_prefixes="webkit",
                         animation_value_type="none",
                         spec="https://drafts.fxtf.org/css-masking/#propdef-mask-composite")}
${helpers.predefined_type("mask-image", "LayerImage",
    initial_value="computed_value::T(None)",
    initial_specified_value="SpecifiedValue(None)",
    spec="https://drafts.fxtf.org/css-masking/#propdef-mask-image",
    vector=True,
    products="gecko",
    extra_prefixes="webkit",
    animation_value_type="none",
    flags="CREATES_STACKING_CONTEXT",
    has_uncacheable_values="True" if product == "gecko" else "False")}
