/// 问题描述: n 个村庄之间的交通图用无向加权图表示
/// 图中的无向边（vi，vj）表示第 i 个村庄和第 j 个村庄之间有道路，边上的权表示这条道路的长度
/// 从这 n 个村庄中选择一个村庄建一所医院
/// 问这所医院应建在哪个村庄，才能使
/// - 离医院最远的村庄到医院最近
/// - 所有村庄到医院的路径和最短
///
/// floyd
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>(); // 村庄数
    let m = sc.scan::<usize>(); // 道路数
    let mut map: Vec<Vec<u32>> = vec![vec![500; n]; n]; // 构建地图, 不连通的是-1
                                                        // 获取用户输入
    (0..m).for_each(|_| {
        let x = sc.scan::<usize>() - 1;
        let y = sc.scan::<usize>() - 1;
        let weight = sc.scan::<u32>();
        map[x][y] = weight;
        map[y][x] = weight; // 是无向图
    });
    // 设为0
    (0..n).for_each(|i| map[i][i] = 0);
    // floyd计算最短路径
    solve(&mut map);
    // 最短路径和
    let sums: Vec<u32> = map.iter().map(|x| x.iter().sum::<u32>()).collect();
    // println!("{:?}", sums);
    // 最小的和
    let min = sums.iter().min().unwrap();
    // 处理重复
    sums.iter().enumerate().for_each(|(i, x)| {
        if x == min {
            println!("{}", i + 1)
        }
    });
}

// 建在那里
fn solve(map: &mut Vec<Vec<u32>>) {
    let len = map.len();
    for k in 0..len {
        for x in 0..len {
            for y in 0..len {
                if map[x][k] + map[k][y] < map[x][y] {
                    map[x][y] = map[x][k] + map[k][y]
                }
            }
        }
    }
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
