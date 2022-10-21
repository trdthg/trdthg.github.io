mod cmp;
mod string;
mod vectorize;

use anyhow::Result;

use self::vectorize::BinaryExpression;
use crate::array::*;
use crate::datatype::*;

pub trait Expression {
    fn eval_expr(&self, data: &[&ArrayImpl]) -> Result<ArrayImpl>;
}

pub enum ExpressionFunc {
    CmpLe,
    CmpGe,
    CmpEq,
    CmpNe,
    StrContains,
}

macro_rules! impl_cmp_expression_of {
    ([$i1:ident, $i2:ident, $cmp_func:ident], $({ $I1:ident, $I2:ident, $C:ident }),*) => {
        match ($i1, $i2) {
            $(
                ($I1! { datatype_match_pattern }, $I2! { datatype_match_pattern }) => {
                    Box::new(BinaryExpression::<
                        $I1! { datatype_scalar },
                        $I2! { datatype_scalar },
                        bool,
                        _
                    >::new(
                        $cmp_func::<
                            $I1! { datatype_scalar },
                            $I2! { datatype_scalar },
                            $C! { datatype_scalar }
                        >,
                    ))
                }
            )*
            (other_dt1, other_dt2) => unimplemented!("unsupported comparison: {:?} <{}> {:?}",
                other_dt1,
                stringify!($cmp_func),
                other_dt2)
        }
    };
}
macro_rules! for_all_cmp_combinations {
    ($macro:ident, $i1:ident, $i2:ident, $cmp_func:ident) => {
        $macro! {
            [$i1, $i2, $cmp_func],
            // comparison for the same type
            { int16, int16, int16 },
            { int32, int32, int32 },
            { int64, int64, int64 },
            { float32, float32, float32 },
            { float64, float64, float64 },
            { decimal, decimal, decimal },
            { fwchar, fwchar, fwchar },
            { varchar, varchar, varchar },
            // comparison across integer types
            { int16, int32, int32 },
            { int32, int16, int32 },
            { int16, int64, int64 },
            { int32, int64, int64 },
            { int64, int16, int64 },
            { int64, int32, int64 },
            // comparison across float types
            { float32, float64, float64 },
            { float64, float32, float64 },
            // comparison across integer and float32 types
            { int16, float32, float32 },
            { float32, int16, float32 },
            { int32, float32, float64 },
            { float32, int32, float64 },
            // comparison across integer and float64 types
            { int32, float64, float64 },
            { float64, int32, float64 },
            { int16, float64, float64 },
            { float64, int16, float64 },
            // comparison with decimal types
            { int16, decimal, decimal },
            { decimal, int16, decimal },
            { int32, decimal, decimal },
            { decimal, int32, decimal },
            { int64, decimal, decimal },
            { decimal, int64, decimal }
        }
    };
}

pub fn build_binary_expression(
    f: ExpressionFunc,
    i1: DataType,
    i2: DataType,
) -> Box<dyn Expression> {
    use ExpressionFunc::*;

    use crate::expr::cmp::*;
    use crate::expr::string::*;

    match f {
        CmpLe => for_all_cmp_combinations! { impl_cmp_expression_of, i1, i2, cmp_le },
        CmpGe => for_all_cmp_combinations! { impl_cmp_expression_of, i1, i2, cmp_ge },
        CmpEq => for_all_cmp_combinations! { impl_cmp_expression_of, i1, i2, cmp_eq },
        CmpNe => for_all_cmp_combinations! { impl_cmp_expression_of, i1, i2, cmp_ne },
        StrContains => Box::new(BinaryExpression::<String, String, bool, _>::new(
            str_contains,
        )),
    }
}

// pub fn build_binary_expression(f: ExpressionFunc) -> Box<dyn Expression> {
//     use ExpressionFunc::*;

//     use crate::expr::cmp::*;
//     use crate::expr::string::*;
//     use crate::expr::vectorize::*;

//     match f {
//         CmpLe => Box::new(BinaryExpression::<i32, i32, bool, _>::new(
//             cmp_le::<i32, i32, i64>,
//         )),
//         CmpGe => Box::new(BinaryExpression::<i32, i32, bool, _>::new(
//             cmp_ge::<i32, i32, i64>,
//         )),
//         CmpEq => Box::new(BinaryExpression::<i32, i32, bool, _>::new(
//             cmp_eq::<i32, i32, i64>,
//         )),
//         CmpNe => Box::new(BinaryExpression::<i32, i32, bool, _>::new(
//             cmp_ne::<i32, i32, i64>,
//         )),
//         StrContains => Box::new(BinaryExpression::<String, String, bool, _>::new(
//             str_contains,
//         )),
//     }
// }

#[cfg(test)]
mod tests {
    use super::*;
    use crate::array::{Array, F64Array, I16Array, StringArray};
    use crate::scalar::ScalarRefImpl;

    #[test]
    fn test_build_str_contains() {
        let expr = build_binary_expression(
            ExpressionFunc::StrContains,
            DataType::Varchar,
            DataType::Char { width: 10 },
        );

        for _ in 0..10 {
            let result = expr
                .eval_expr(&[
                    &StringArray::from_slice(&[Some("000"), Some("111"), None]).into(),
                    &StringArray::from_slice(&[Some("0"), Some("0"), None]).into(),
                ])
                .unwrap();
            assert_eq!(result.get(0).unwrap(), ScalarRefImpl::Bool(true));
            assert_eq!(result.get(1).unwrap(), ScalarRefImpl::Bool(false));
            assert!(result.get(2).is_none());
        }
    }

    #[test]
    fn test_cmp_i16_f64() {
        let expr =
            build_binary_expression(ExpressionFunc::CmpGe, DataType::SmallInt, DataType::Double);

        let result = expr
            .eval_expr(&[
                &I16Array::from_slice(&[Some(1), Some(2), None]).into(),
                &F64Array::from_slice(&[Some(0.0), Some(3.0), None]).into(),
            ])
            .unwrap();
        assert_eq!(result.get(0).unwrap(), ScalarRefImpl::Bool(true));
        assert_eq!(result.get(1).unwrap(), ScalarRefImpl::Bool(false));
    }
}
