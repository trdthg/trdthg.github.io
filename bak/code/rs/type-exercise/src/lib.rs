#![feature(associated_type_bounds)]
#![feature(generic_associated_types)]

use scalar::Scalar;
pub mod array;
mod datatype;
pub mod expr;
mod macros;
pub mod scalar;
use thiserror::Error;

#[derive(Error, Debug)]
#[error("Type mismatch on conversion: expected {0}, get {1}")]
pub struct TypeMismatch(&'static str, &'static str);

#[test]
fn test() {
    let mut a = "aaa".to_string();

    let a1 = a.as_str();
    let a5 = a.as_mut_str();

    let a2: &str = a.as_ref();
    let a3 = a.as_mut();

    let a4 = &a;
    let a6 = &mut a;

    let a7 = a.as_mut_ptr();
    let a8 = a.as_ptr();

    unsafe {
        *a7 = 'b' as u8;
        println!("{}", *a7);
    };
    println!("{}", a);
    // let a9 = a.as_scalar_ref();
}
