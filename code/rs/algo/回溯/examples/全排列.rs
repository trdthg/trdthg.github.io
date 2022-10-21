fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<usize>();
    let nums = (0..s).map(|_| sc.scan()).collect::<Vec<i32>>();
    let res = solve(&nums);
    println!("{:?}", res);
}

fn solve(nums: &Vec<i32>) -> Vec<Vec<i32>> {
    let mut res = vec![];
    let mut path = vec![];
    let mut skip_indexs = vec![false; nums.len()];
    backtracing(&nums, 0, &mut skip_indexs, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    nums: &Vec<i32>,
    start_index: usize,
    skip_indexs: &mut Vec<bool>,
    res: &mut Vec<Vec<i32>>,
    path: &mut Vec<i32>,
) {
    if path.len() == nums.len() {
        res.push(path.clone());
        return;
    }
    for i in start_index..nums.len() {
        if skip_indexs[i] {
            continue;
        }
        println!("{:?} {}", &path, nums[i]);
        path.push(nums[i]);
        skip_indexs[i] = true;
        backtracing(nums, start_index, skip_indexs, res, path);
        skip_indexs[i] = false;
        path.pop();
    }
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(2 * 2, 4);
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
