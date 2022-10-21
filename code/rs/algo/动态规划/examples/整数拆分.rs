/// 问题描述：给定一个正整数 n，将其拆分为至少两个正整数的和，
/// 并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>() as u32;
    // 1. 确定树组：一维数组存储拆分 i 的乘积最大值，下标表示第 i 个值
    let mut dp = [0; 300];
    // 2. 确定递推公式
    // 1
    // 2 = 1 + 1 | 1 + #1 => 1
    // 3 = 1 + 2 | 1 + #2 => 2
    // 4 = 1 + 3 | 1 + #3 |
    //     2 + 2 | 2 + #2 => 4
    // 5 = 1 + 4 | 1 + #4 |
    //     2 + 3 | 2 + #3 => 6
    // dp[i] = max(i-1, dp[i-1], i - 2 * n-(i-2), n-2 * dp[n-(i-2)] ...)
    // 3. 初始化
    dp[1] = 1;
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 7
    // 1 1 2 3 5 8 13

    let res = match n {
        1 => 1,
        n => {
            for i in 1..=n as usize {
                for j in 1..i {
                    if j >= i - j {
                        break;
                    }
                    dp[i] = dp[i].max((j * (i - j)).max(j * dp[i - j]));
                }
            }
            dp[n as usize]
        }
    };
    println!("{}", res);
}

struct Scanner<R: std::io::BufRead> {
    reader: R,
    buf: std::str::SplitAsciiWhitespace<'static>,
    buff: Vec<u8>,
}

impl<R: std::io::BufRead> Scanner<R> {
    pub fn new(reader: R) -> Self {
        Scanner {
            reader,
            buf: "".split_ascii_whitespace(),
            buff: vec![],
        }
    }
    pub fn scan<T: std::str::FromStr>(&mut self) -> T {
        loop {
            if let Some(s) = self.buf.next() {
                return s.parse().ok().unwrap();
            } else {
                self.buff.clear();
                self.reader.read_until(b'\n', &mut self.buff).unwrap();
                self.buf = unsafe {
                    std::mem::transmute(
                        std::str::from_utf8_unchecked(&self.buff).split_ascii_whitespace(),
                    )
                };
            }
        }
    }
}
