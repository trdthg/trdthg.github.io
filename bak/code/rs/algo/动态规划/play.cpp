#include <bits/stdc++.h>
using namespace std;
int c[5][5] = {
	0,
	-3,
	-4,
	-2,
	-1,
	-3,
	5,
	-1,
	-2,
	-1,
	-4,
	-1,
	5,
	-3,
	-2,
	-2,
	-2,
	-3,
	5,
	-2,
	-1,
	-1,
	-2,
	-2,
	5,
};
int n, m;
int nn[108], mm[108];
int f[108][108];
int main()
{
	cin >> n;
	for (int i = 1; i <= n; i++)
	{
		char ch;
		cin >> ch;
		if (ch == 'A')
			nn[i] = 1;
		if (ch == 'C')
			nn[i] = 2;
		if (ch == 'G')
			nn[i] = 3;
		if (ch == 'T')
			nn[i] = 4;
	}
	cin >> m;
	for (int i = 1; i <= m; i++)
	{
		char ch;
		cin >> ch;
		if (ch == 'A')
			mm[i] = 1;
		if (ch == 'C')
			mm[i] = 2;
		if (ch == 'G')
			mm[i] = 3;
		if (ch == 'T')
			mm[i] = 4;
	}

	for (int i = 1; i <= n; i++)
		f[i][0] = f[i - 1][0] + c[0][nn[i]];
	for (int i = 1; i <= m; i++)
	
		f[0][i] = f[0][i - 1] + c[0][nn[i]];
	for (int i = 0; i <= n; i++)
	{
		for (int j = 0; j <= m; j++)
		{
			cout << f[i][j] << " ";
		}
		cout << endl;
	}
	//预处理部分
	for (int i = 1; i <= n; i++)
	{
		for (int j = 1; j <= m; j++)
		{
			f[i][j] = max(f[i - 1][j - 1] + c[nn[i]][mm[j]], max(f[i - 1][j] + c[0][nn[i]], f[i][j - 1] + c[0][mm[j]]));
		}
	}
	for (int i = 0; i <= n; i++)
	{
		for (int j = 0; j <= m; j++)
		{
			cout << f[i][j] << " ";
		}
		cout << endl;
	}

	cout << f[n][m] << endl;
}