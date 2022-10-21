/// 问题描述：有 n 个人排队到 1 个水龙头处打水, 第 i 个人装满水桶所需的时间是 Ti
/// 请问如何安排他们的打水顺序才能使所有人的平均等待时间最小？
///
/// 输入：第一行包含整数 n； 第二行包含 n 个整数，其中第 i 个整数表示第 i 个人装满水桶所花费的时间 Ti。
/// 输出：输出一个整数，表示最小的平均等待时间。
///
/// 小的排最前面，同果子问题

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>() as u32;
    let mut times: Vec<u32> = (0..n).map(|_| sc.scan()).collect();
    // 倒序排列
    times.sort_by(|a, b| a.cmp(b));
    let res = times
        .iter()
        .fold((n, 0), |(n, sumt), t| (n - 1, sumt + t * (n - 1)));
    println!("{:.2?}", res.1 as f64 / n as f64);
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
