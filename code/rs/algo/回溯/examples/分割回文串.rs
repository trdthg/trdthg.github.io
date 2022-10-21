use std::io::BufRead;

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<String>();
    let res = solve(s);
    println!("{:?}", res);
}

fn solve(n: String) -> Vec<Vec<String>> {
    let chars = n.chars().collect();
    let mut res = vec![];
    let mut path = vec![];
    backtracing(&chars, 0, &mut res, &mut path);
    let res = res
        .iter()
        .map(|x| x.iter().map(|x| x.iter().collect()).collect())
        .collect();
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    chars: &Vec<char>,
    start_index: usize,
    res: &mut Vec<Vec<Vec<char>>>,
    path: &mut Vec<Vec<char>>,
) {
    // println!("fff: {}", start_index);
    if start_index >= chars.len() {
        res.push(path.clone());
        return;
    }
    for i in start_index..chars.len() {
        // println!("{:?} {} {}", path, start_index, i);
        // 不是回文串 a ab
        if !is_palindrome(&chars[start_index..=i]) {
            continue;
        }
        // a a b
        // println!("{:?} {} {}", path, start_index, i);
        path.push(chars[start_index..=i].to_owned());
        // println!("{:?} {} {}", path, start_index, i);
        backtracing(chars, i + 1, res, path);
        path.pop();
        // println!("{:?} {} {}", path, start_index, i);
    }
}

fn is_palindrome(chars: &[char]) -> bool {
    if chars.len() == 0 {
        return false;
    }
    if chars.len() == 1 {
        return true;
    }
    let mut l = 0;
    let mut r = chars.len() - 1;
    while l < r {
        if chars[l] != chars[r] {
            return false;
        }
        l += 1;
        r -= 1;
    }
    true
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
                self.reader.read_line(&mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
