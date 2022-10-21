/// 问题描述：要求输入总投资额和项目总数 m、n，以及 g 数组，
/// 然后按行输入每个项目的投资获益额，程序最终输出最大收益值。

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let m = sc.scan::<usize>();
    let n = sc.scan::<usize>();
    let wv: Vec<Vec<i32>> = (0..n)
        .map(|_| (0..m).map(|_| sc.scan()).collect())
        .collect();
    let mut dp = vec![vec![0; m + 1]; n];
    for i in 1..=m {
        dp[0][i] = wv[0][i - 1];
    }

    for i in 1..n {
        for j in 1..=m {
            for k in 0..=j {
                let v = if k == 0 { 0 } else { wv[i][k - 1] };
                dp[i][j] = dp[i][j].max(v + dp[i - 1][j - k]);
            }
        }
    }

    println!("{:?}", dp[n - 1][m]);
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
