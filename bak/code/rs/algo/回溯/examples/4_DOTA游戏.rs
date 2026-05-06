#![allow(non_snake_case)]
#![allow(unused)]
/// 为了让打野更有效率，敌法师经常使用 Blink 技能（我们假设该技能没有 CD 时间）来回穿梭于各个野怪点。
/// 假设有 N 个野怪点。敌法师选择其中任何一个开始打野。
/// 对于每个野怪点，敌法师使用 Ti 时间杀掉野怪并获取 Gi 金钱。
/// 一个地方的野怪如果被杀掉则不会再出现了。
/// 现在我们的敌法师想获取 M 金钱买装备。
/// 但是我们的敌法师没有太多时间，所以我们需要计算敌法师获取 M 金钱的最短时间。
///【输入】多样例，第一行是样例数目 T.
/// 每个样例开始于两个正整数 N 和 M，然后就是 N 行，
/// 每行有三个整数 Ti, Gi, Ki，
/// 其中 Ki 是敌法师可以从当前野怪点 blink 到几个其他的野怪点。
/// 然后就是 Ki 个整数 Cij.
/// 输入假设如果敌法师可以从 i 野怪点 blink 到野怪点 j，则亦可以从 j blink 回 i.
///
// 输入的范围是
// 1. 1 <= T <= 50
// 2. 1 <= N <= 50
// 3. 1 <= Ti <= 10000000
// 4. 1 <= M, Gi <= 1000000000
// 5. 1 <= Ki < N
// 6. 1 <= Cij <= N

//【输出】
// 对每个样例，输出最短时间。

//【样例输入】
// 3
// 1 4
// 2 5 0
// 1 5
// 1 4 0
// 4 10
// 1 9 0
// 3 3 1
// 3
// 3 3 2
// 2 4
// 4 4 1
// 3
use std::collections::HashMap;
//【样例输出】
// Case 1: 2
// Case 2: Poor Magina, you can't save the world all the time!
// Case 3: 10
type Map = HashMap<usize, (usize, usize, usize, Vec<usize>)>;
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let n = sc.scan::<usize>();
    // 循环次数
    (0..n).for_each(|_| {
        // N 个点
        let n = sc.scan::<usize>();
        // 需要的金钱数
        let m = sc.scan();
        // println!("{n}, {m}");
        let mut map: Map = HashMap::new();
        (0..n).enumerate().for_each(|(i, _)| {
            // ID： 从 1 开始
            let id = i + 1;
            // T: 时间 G：金钱 K：可以传送到的点
            let (t, g, k) = (sc.scan(), sc.scan(), sc.scan());
            // 传送点 ID
            // println!("{t} {g} {k}");
            let to = (0..k).map(|_| sc.scan()).collect::<Vec<usize>>();
            map.insert(i, (id, t, g, to));
        });
        // println!("m: {} map: {:?}", m, map);
        let res = solve(m, &mut map);
        res.iter()
            .for_each(|x| println!("{} {} {:?}", x.1, x.2, x.0));
    });
}

fn dfs(map: &mut Map, p: usize, to: Vec<usize>) {}

fn devide(map: &mut Map) {
    for p in map {
        // dfs(map, p.1 .1, p.1 .3);
    }
}
fn solve(m: usize, map: &mut Map) -> Vec<(Vec<usize>, usize, usize)> {
    let mut other = Other {
        res: vec![],
        path: vec![],
    };
    map.iter().for_each(|x| println!("{} {:?}", x.1 .0, x.1 .3));

    devide(map);

    let mut skip_indexs: HashMap<usize, Vec<bool>> = HashMap::new();
    for (_, (id, .., to)) in map.iter() {
        skip_indexs.insert(*id, vec![false; map.len() + 1]);
    }
    for (_, (id, ..)) in map.iter() {
        println!("便利顺序 {}", id);
    }
    let mut current_t = 0;
    let mut current_m = 0;
    backtracing(
        m,
        &map,
        0,
        &mut current_m,
        &mut current_t,
        &mut skip_indexs,
        &mut other,
        0,
    );
    other.res
}

struct Other {
    res: Vec<(Vec<usize>, usize, usize)>,
    path: Vec<usize>,
}

// 1. 函数的参数和返回值
fn backtracing(
    m: usize,  // 金钱数
    map: &Map, // Index: (ID, Time, Money, {to})
    current_id: usize,
    current_m: &mut usize,
    current_t: &mut usize,
    skip_indexs: &mut HashMap<usize, Vec<bool>>,
    other: &mut Other,
    deep: usize,
) {
    if *current_m > m {
        other.res.push((other.path.clone(), *current_t, *current_m));
        return;
    }
    for (_, (id, time, money, to)) in map.iter() {
        if deep != 0 && *id != current_id {
            continue;
        }
        if !other.path.contains(id) {
            *current_m += money;
            *current_t += time;
        }
        other.path.push(*id);
        println!("P: {:?}", &other.path);
        for next_id in to {
            if skip_indexs[id][*next_id] {
                continue;
            }
            skip_indexs.get_mut(id).unwrap()[*next_id] = true;
            backtracing(
                m,
                map,
                *next_id,
                current_m,
                current_t,
                skip_indexs,
                other,
                deep + 1,
            );
            skip_indexs.get_mut(id).unwrap()[*next_id] = false;
        }
        other.path.pop();
        if !other.path.contains(id) {
            *current_m -= money;
            *current_t -= time;
        }
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
