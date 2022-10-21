fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>(); // 村庄数
    let m = sc.scan::<usize>(); // 道路数
    let mut map: Vec<Vec<u32>> = vec![vec![500; n]; n]; // 构建地图, 不连通的是-1
    (0..m).for_each(|_| {
        // 获取用户输入
        let x = sc.scan::<usize>() - 1;
        let y = sc.scan::<usize>() - 1;
        let weight = sc.scan::<u32>();
        map[x][y] = weight;
    });
    // 设为0
    (0..n).for_each(|i| map[i][i] = 0);
    // floyd计算最短路径
    solve(&mut map);
}

fn solve(map: &mut Vec<Vec<u32>>) {
    // todo
    let init = 0;
    // 已经加入的顶点
    let mut joined_vertex = vec![false; map.len()];
    joined_vertex[init] = true;
    // 顶点i的前驱节点
    let mut prev_vertex = vec![0; map.len()];
    // 顶点距离其他点的距离
    let mut dist_from_init = map[init].clone();

    for i in 1..map.len() {
        let mut min = u32::MAX;
        let mut ready_for_join = init;
        for v in 0..map.len() {
            if joined_vertex[v] == true {
                continue;
            }
            if dist_from_init[v] < min {
                min = dist_from_init[v];
                ready_for_join = v;
            }
        }
        joined_vertex[ready_for_join] = true;

        for i in 0..map.len() {
            if joined_vertex[i] == true {
                continue;
            }
            let tmp = if map[init][i] == u32::MAX {
                u32::MAX
            } else {
                min + map[init][i]
            };
            if tmp < dist_from_init[i] {
                dist_from_init[i] = tmp;
                prev_vertex[i] = ready_for_join;
            }
        }
    }
    for i in 0..map.len() {
        println!("0 {} {}", i, dist_from_init[i]);
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
