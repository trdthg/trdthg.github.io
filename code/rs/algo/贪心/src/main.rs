mod scanner;
fn main() {}

#[test]
fn aa() {
    // 只包括最基础的几种控制字符
    let mut iter = " Mary   had\ta\u{2009} little  \n\t lamb".split_ascii_whitespace();
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    // split_whitespace包含的Unicode规定的很多控制字符 包括\u{xxxx}
    let mut iter = " Mary   had\ta\u{2009} little  \n\t lamb".split_whitespace();
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
}

// let reader = std::io::stdin();
// let mut n = 0;
// let mut arr: Vec<u32> = Vec::new();
// let mut i = 0;

// let mut inputs: Vec<String> = Vec::new();
// loop {
//     let x = if inputs.len() == 0 {
//         let mut buf = String::new();
//         reader.read_line(&mut buf).unwrap();
//         inputs = buf
//             .trim()
//             .split(char::is_whitespace)
//             .map(|s| s.to_string())
//             .collect();
//         inputs.remove(0)
//     } else {
//         inputs.remove(0)
//     };
//     match i {
//         0 => n = inputs.remove(0).parse::<u32>().unwrap(),
//         i if i == n => {
//             arr.push(inputs.remove(0).parse::<u32>().unwrap());
//             break;
//         }
//         _ => arr.push(inputs.remove(0).parse::<u32>().unwrap()),
//     }
//     i += 1;
// }
// println!("{}", n);
// println!("{:?}", arr);

// let reader = std::io::stdin();
// let mut buf = String::new();
// reader.read_line(&mut buf).unwrap();
// let n = buf.trim().parse::<u8>().expect("邮局数必须是数字");
// let arr = (0..n)
//     .into_iter()
//     .map(|_| {
//         buf.clear();
//         reader.read_line(&mut buf).unwrap();
//         let n = buf.trim().parse::<u32>().expect("输入的不是数字");
//         n
//     })
//     .collect::<Vec<u32>>();
