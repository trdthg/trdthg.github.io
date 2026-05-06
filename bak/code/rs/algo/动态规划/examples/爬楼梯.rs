/// 问题描述：需要 n 阶你才能到达楼顶。
/// 每次你可以爬 1 或 2 个台阶。
/// 你有多少种不同的方法可以爬到楼顶呢？

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>() as u32;
    // 1. 确定树组：一维数组来记录不同楼层的状态，下标表示爬到第 i 阶的方法
    let mut dp = [0; 30];
    // 2. 确定递推公式
    // #1 = 1
    // #2 = 2 | #1 + 1 = 2
    // #3 = #1 + 爬 2 阶 | #2 + 爬 1 价 =（2）+（2）= 4
    // dp[i] = dp[i - 2] + dp[i - 1]
    // 3. 初始化
    // dp[0] = 0 | 1; 不重要，不会有 0 价
    dp[1] = 1;
    dp[2] = 2;
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 5
    // 1 2 3 5 8

    let res = match n {
        1 | 2 => dp[n as usize - 1],
        n => {
            for i in 3..=n as usize {
                dp[i] = dp[i - 1] + dp[i - 2];
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
