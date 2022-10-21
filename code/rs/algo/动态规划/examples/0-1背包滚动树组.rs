/// 问题描述：F(n) = F(n - 1) + F(n - 2)
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    // 背包容量
    let m = sc.scan::<usize>();
    // 物品个数
    let n = sc.scan::<usize>();
    // 1. 确定树组：二维数组 dp[i][j]，i 表示第 i 个物品，j 表示背包容量
    // dp[i][j] 表示从 0..i 的物品里任意取的最大价值
    let wv = (0..n)
        .map(|_| (sc.scan(), sc.scan()))
        .collect::<Vec<(i32, i32)>>();
    // 2. 确定递推公式 F(n) = F(n - 1) + F(n - 2)
    // 3. 初始化
    let mut dp = vec![0; m + 1];
    dp[0] = 0;
    for i in 1..=m {
        dp[i] = if i as i32 >= wv[0].0 { wv[0].1 } else { 0 };
    }
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 7
    // 1 1 2 3 5 8 13
    for i in 1..n {
        for j in (1..=m).rev() {
            dp[j] = if j as i32 - wv[i].0 >= 0 {
                dp[j].max(dp[j - wv[i].0 as usize] + wv[i].1)
            } else {
                dp[j]
            };
        }
    }
    println!("{:?}", dp[m]);
    // let res = match m {
    //     1 | 2 => 1,
    //     n => {
    //         for i in 2..n as usize {
    //             dp[i] = dp[i - 1] + dp[i - 2];
    //         }
    //         dp[(n - 1) as usize]
    //     }
    // };
    // println!("{}", res);
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
