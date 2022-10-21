#![allow(non_snake_case)]
static ZERO: char = '0';
// 25525511135
// 0000
// 1111
// 010010
// 101023
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<String>();
    let res = solve(s);
    println!("{:?}", res);
}

fn solve(n: String) -> Vec<String> {
    let chars = n.chars().collect();
    let mut res = vec![];
    let mut path = vec![];
    let mut point_num = 0;
    backtracing(&chars, 0, &mut point_num, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    chars: &Vec<char>,
    start_index: usize,
    point_num: &mut usize,
    res: &mut Vec<String>,     // ["111.111.111.111", "213.123.341.1"]
    path: &mut Vec<Vec<char>>, // [ "192", "168" ]
) {
    // println!("{}", point_num);
    if *point_num == 3 {
        if !is_valid(&chars[start_index..chars.len()]) {
            return;
        }
        path.push(chars[start_index..chars.len()].to_owned());
        res.push(
            path.iter()
                .map(|x| x.iter().collect())
                .collect::<Vec<String>>()
                .join("."),
        );
        path.pop();
        return;
    }
    for i in start_index..chars.len() {
        // println!(
        //     "{:?} {}",
        //     &chars[start_index..=i],
        //     is_valid(&chars[start_index..=i])
        // );
        if !is_valid(&chars[start_index..=i]) {
            break;
        }
        // a a b
        // println!("{:?} {} {}", path, start_index, i);
        path.push(chars[start_index..=i].to_owned());
        *point_num += 1;
        // println!("bef: {:?} {} {} {}", path, start_index + 1, i, point_num);
        backtracing(chars, i + 1, point_num, res, path);
        // if *point_num == 3 {
        //     println!("??: {:?}", &path);
        // }
        *point_num -= 1;
        path.pop();
        // println!("aft: {:?} {} {}", path, start_index + 1, i);
    }
}

fn is_valid(chars: &[char]) -> bool {
    // println!("chars: {}", chars.iter().collect::<String>());
    if chars.len() > 1 && chars[0] == ZERO {
        return false;
    }
    match chars
        .iter()
        .collect::<String>()
        .parse::<u32>()
        .map(|x| x <= 255)
    {
        Ok(b) => b,
        _ => false,
    }
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(
            solve("aab".to_string()),
            vec![vec!["a".to_string(), "a".to_string(), "b".to_string()]]
        );
    }
    #[test]
    fn it_should_return_err() {}
}

struct Scanner<'a> {
    reader: std::io::BufReader<std::io::Stdin>,
    buffer: std::str::SplitAsciiWhitespace<'a>,
    buf: String,
}

impl<'a> Scanner<'a> {
    fn new(reader: std::io::Stdin) -> Self {
        Self {
            reader: std::io::BufReader::new(reader),
            buffer: "".split_ascii_whitespace(),
            buf: String::new(),
        }
    }

    fn scan<T: std::str::FromStr>(&mut self) -> T {
        loop {
            if let Some(s) = self.buffer.next() {
                return s.parse().ok().unwrap();
            } else {
                self.buf.clear();
                std::io::BufRead::read_line(&mut self.reader, &mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
