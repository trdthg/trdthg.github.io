use std::io::BufRead;

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let k = sc.scan::<String>();
    // 23
    // 1 2 3 4 -> [1 2, 1 3, 1 4, 2 3, 2 4, 3 4]
    let res = solve(k);
    println!("{:?}", res);
}

fn solve(n: String) -> Vec<String> {
    let letter_map = vec![
        vec![],
        vec![],
        vec!['a', 'b', 'c'],
        vec!['d', 'e', 'f'],
        vec!['g', 'h', 'i'],
        vec!['j', 'k', 'l'],
        vec!['m', 'n', 'o'],
        vec!['p', 'q', 'r', 's'],
        vec!['t', 'u', 'v'],
        vec!['w', 'x', 'y', 'z'],
    ];
    let mut res = vec![];
    let mut path = vec![];
    let a = n.chars().map(|x| x.to_digit(10).unwrap() as u32).collect();
    backtracing(&a, 0, &letter_map, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    digits: &Vec<u32>,
    start_index: usize,
    letter_map: &Vec<Vec<char>>,
    res: &mut Vec<String>,
    path: &mut Vec<char>,
) {
    // 终止条件
    if path.len() == digits.len() {
        res.push(path.iter().collect());
        return;
    }
    // 剪枝
    for i in letter_map[digits[start_index] as usize].iter() {
        // dbg!(i);
        path.push(i.clone());
        backtracing(digits, start_index + 1, letter_map, res, path);
        path.pop();
    }
}

#[cfg(test)]
mod test {
    use 组合问题::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(solve(vec![1, 2, 3, 4, 7, 9, 10], 2), 1);
    }
    #[test]
    fn it_should_return_err() {
        assert_eq!(solve(vec![1, 2, 3, 4, 7, 9, 10], 8), -1);
    }
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
                self.reader.read_line(&mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
