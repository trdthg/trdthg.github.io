/// 问题描述：国王邀请 n 位大臣玩一个游戏。
/// 首先，他让每个大臣在左、右手上面分别写下一个整数，国王自己也在左、右手上各写一个整数。
/// 这 n 位大臣排成一排，国王站在队伍的最前面。
/// 排好队后，每人获得的金币数分别是：
/// 它前面的所有人的左手上的数的乘积 除 以他自己右手上的数，然后向下取整得到的结果
/// 重新排序，使得获得奖赏最多的大臣，所获奖赏尽可能的少。(国王的位置始终在队伍的最前面)
/// 输入:（要求：1≤ n≤20，0 < a、b < 8）
/// 第 1 行包含一个整数 n，表示大臣的人数； 第 2 行包含两个整数 a 和 b，分别表示国王左手和右手上的整数；
/// 接下来 n 行，每行包含两个整数 a 和 b，之间用一个空格隔开，分别表示每个大臣左手和右手上的整数。
/// 输出：一个整数，表示重新排列后的队伍中获奖赏最多的大臣所获得的金币数。
///
/// 左右手上乘积大的排到后面

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>() + 1;
    let mut arr: Vec<(u32, u32)> = (0..n).map(|_| (sc.scan(), sc.scan())).collect();
    let (head, tail) = arr.split_at_mut(1);
    tail.sort_by(|a, b| (a.0 * a.1).cmp(&(&b.0 * &b.1)));
    let res = tail.iter().fold((head[0].0, 0), |(sum, max), x| {
        if max < sum / x.1 {
            let tmp = sum / x.1;
            return (sum * x.0, tmp);
        }
        (sum * x.0, max)
    });
    println!("{}", res.1);
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
