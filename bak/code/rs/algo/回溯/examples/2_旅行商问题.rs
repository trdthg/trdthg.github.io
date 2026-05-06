fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let n = sc.scan::<usize>();
    let path_map = (0..n)
        .map(|_| (0..n).map(|_| sc.scan::<i32>()).collect())
        .collect::<Vec<Vec<i32>>>();
    let res = solve(&path_map);

    let mut min_index = 0;
    let mut min = 0;
    res.iter().enumerate().for_each(|(i, x)| {
        let mut sum = 0;
        for (i, v) in x.iter().enumerate() {
            if i == path_map.len() {
                break;
            }
            let next_index = i + 1;
            sum += path_map[*v as usize][x[next_index]];
        }
        if sum < min {
            min = sum;
            min_index = i;
        }
        println!("{:?} {}", x, sum)
    });
    println!("最短路径： {:?} {}", res[min_index], min);
}

fn solve(map: &Vec<Vec<i32>>) -> Vec<Vec<usize>> {
    let mut other = Other {
        res: vec![],
        path: vec![],
    };
    let last_index = 0;
    let mut skip_indexs = vec![false; map.len()];
    skip_indexs[last_index] = true;
    other.path.push(last_index);
    let mut min_distince = i32::MAX;
    backtracing(
        0,
        &map,
        0,
        &mut min_distince,
        &mut skip_indexs,
        last_index,
        &mut other,
    );
    other.res
}

struct Other {
    res: Vec<Vec<usize>>,
    path: Vec<usize>,
}

// 1. 函数的参数和返回值
fn backtracing(
    n: usize,
    map: &Vec<Vec<i32>>,
    current_distance: i32,
    min_sistance: &mut i32,
    skip_indexs: &mut Vec<bool>,
    last_index: usize,
    other: &mut Other,
) {
    // 如果距离更远了，或者是两个村庄不通
    // println!("P: {:?}", other.path);

    if other.path.len() == map.len() {
        let current_distance = current_distance
            + map[*other.path.last().unwrap() as usize][*other.path.first().unwrap() as usize];
        other.path.push(*other.path.first().unwrap());
        // println!("{:?} {}", &other.path, current_distance);
        if other.res.is_empty() || current_distance < *min_sistance {
            *min_sistance = current_distance;
            // other.res.push(other.path.clone());
        }
        other.res.push(other.path.clone());
        other.path.pop();
        return;
    }

    for i in 0..map.len() {
        if skip_indexs[i] {
            continue;
        }
        // println!("dis: {} {last_index} {i}", map[last_index][i]);
        other.path.push(i);
        skip_indexs[i] = true;
        backtracing(
            n,
            map,
            current_distance + map[last_index][i],
            min_sistance,
            skip_indexs,
            i,
            other,
        );
        skip_indexs[i] = false;
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
