fn main() {
    // match "012".to_string().parse::<u32>() {
    //     Ok(x) => println!("{}", x),
    //     Err(e) => println!("{}", e),
    // }
    unsafe {
        let mut a = Vec::from_raw_parts(add as *mut u8, 100, 10);
        a[5] = 32;
        a[23] = 65;
        a[19] = 78;
        a[13] = 5;
    }
    println!("|{}|", add());
    println!("Hello, world!");
}

fn add() -> isize {
    (3 << 10 + 9 >> 12 << 2) << 10 >> 41
}
