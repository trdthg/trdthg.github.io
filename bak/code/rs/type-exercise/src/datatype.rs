pub(crate) mod macros;
pub(crate) use macros::*;
#[derive(Debug)]
pub enum DataType {
    // i16
    SmallInt,
    // i32
    Integer,
    // i64
    BigInt,
    // carchar
    Varchar,
    // char(10)
    Char { width: u16 },
    // bool
    Boolean,
    // f32
    Real,
    // f64
    Double,
    // deciml(2,6)
    Decimal { scale: u16, precision: u16 },
}
