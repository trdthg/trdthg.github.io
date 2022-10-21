// 3
// 1 2 2
//
// [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
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
    backtracing(&nums, 0, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(nums: &Vec<i32>, start_index: usize, res: &mut Vec<Vec<i32>>, path: &mut Vec<i32>) {
    res.push(path.clone());
    if start_index == nums.len() {
        return;
    }
    for i in start_index..nums.len() {
        // 只需要在这里添加去重即可
        if i > start_index && nums[i] == nums[i - 1] {
            continue;
        }
        // println!("{:?} {}", &path, nums[i]);
        path.push(nums[i]);
        backtracing(nums, i + 1, res, path);
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
