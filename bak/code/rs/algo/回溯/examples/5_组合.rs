/// 已知数组 A[0…N-1]，给定某数值 sum，找出数组中的若干个数，使得这些数的和为 sum
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let n = sc.scan::<i32>();
    // let nums = (0..n).map(|_| sc.scan()).collect();
    let nums = (0..n).map(|i| i).collect();
    println!("{:?}", nums);
    let sum = sc.scan::<i32>();
    let res = solve(&nums, sum);
    println!("{:?}", res);
}

fn solve(nums: &Vec<i32>, sum: i32) -> Vec<Vec<i32>> {
    let mut other = Other {
        res: vec![],
        path: vec![],
    };
    backtracing(&nums, sum, 0, &mut other);
    other.res
}

struct Other {
    res: Vec<Vec<i32>>,
    path: Vec<i32>,
}

// 1. 函数的参数和返回值
fn backtracing(nums: &Vec<i32>, sum: i32, start_index: usize, other: &mut Other) {
    if other.path.iter().sum::<i32>() == sum {
        other.res.push(other.path.clone());
        return;
    }
    for i in start_index..nums.len() {
        other.path.push(nums[i]);
        backtracing(nums, sum, i + 1, other);
        other.path.pop();
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
                std::io::BufRead::read_line(&mut self.reader, &mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
