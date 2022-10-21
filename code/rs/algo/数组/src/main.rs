macro_rules! curry {
    (|$a: ident, $($b: ident),* | $c: expr) => {
        {
            let mut res = $a;
            $(
                res += $b;
            )*
            res
        }
    };
}

fn main() {
    let a = 1;
    let b = 2;
    let a = curry!(|a, b, b, b, b, b| 2);
    println!("{a}");
    println!("Hello, world!");
}
