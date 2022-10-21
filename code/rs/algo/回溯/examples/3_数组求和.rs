/// 给你 N 个数字，每个数字均不同，你可以取其中任意个数字和，如果所得到的结果在给出的数列中也能找到，则输出这个等式
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let n = sc.scan::<i32>();
    let mut nums = (0..n).map(|_| sc.scan()).collect::<Vec<i32>>();
    nums.sort();
    let res = solve(nums);
    println!("{:?}", res);
}

fn solve(nums: Vec<i32>) -> Vec<Vec<i32>> {
    let mut other = Other {
        res: vec![],
        path: vec![],
    };
    backtracing(&nums, 0, 0, &mut other);
    other.res
}

struct Other {
    res: Vec<Vec<i32>>,
    path: Vec<i32>,
}
// 6
// 1 2 3 4 5 6
// 1. 函数的参数和返回值
fn backtracing(nums: &Vec<i32>, current_sum: i32, start_index: usize, other: &mut Other) {
    // println!("{}: bf", current_sum);
    for i in start_index..nums.len() {
        if start_index == 0 {
            break;
        }
        match current_sum.cmp(&nums[i]) {
            std::cmp::Ordering::Less => {}
            std::cmp::Ordering::Equal => {
                other.res.push(other.path.clone());
                return;
            }
            std::cmp::Ordering::Greater => {}
        }
    }
    for i in start_index..nums.len() {
        other.path.push(nums[i]);
        println!("{start_index}: {:?}", other.path);
        backtracing(nums, current_sum + nums[i], i + 1, other);
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
