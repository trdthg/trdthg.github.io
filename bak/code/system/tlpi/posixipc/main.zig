const std = @import("std");
const c = std.c;

const expect = std.testing.expect;

const mat4x4 = [4][4]f32{
    [_]f32{ 1.0, 0.0, 0.0, 0.0 },
    [_]f32{ 0.0, 1.0, 0.0, 1.0 },
    [_]f32{ 0.0, 0.0, 1.0, 0.0 },
    [_]f32{ 0.0, 0.0, 0.0, 1.0 },
};

pub fn main() !void {
    var a = "aaa";
    std.debug.print("{}", .{@TypeOf(a)});
    _ = c.printf("Hello %s\n", "World");

    var p = @ptrCast([*]u8, std.c.malloc(10));
    p[0] = 'h';
    p[1] = 'e';
    p[2] = 'e';
    p[3] = 'o';
    p[4] = 'o';
    p[5] = '\n';
    _ = c.printf("Hello %s\n", p);

    std.debug.print("aaa {d}\n", .{1});
}

test "multidimensional arrays" {
    // Access the 2D array by indexing the outer array, and then the inner array.
    try expect(mat4x4[1][1] == 1.0);

    // Here we iterate with for loops.
    for (mat4x4) |row, row_index| {
        for (row) |cell, column_index| {
            if (row_index == column_index) {
                try expect(cell == 1.0);
            }
        }
    }
}

// Compile time coercion of float to int
test "implicit cast to comptime_int" {
    var f: f32 = 54.0 / @as(comptime_float, 10);
    _ = f;
}
