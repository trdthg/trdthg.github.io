# OAuth 2.0 流程分析

[www.oauth.com](https://www.oauth.com/)

## 1. Getting ready 开始

### 1.1 Creating an Application(一般需要 sign up as a developer)

user -> entering basic information such as the name, website, logo, etc. server
-> return a **client_id** (and a **client_secret** in some cases)

### 1.2 Redirect URLs and State

1. 为了使同一个 clientID 同时拥有多个状态，Some services may allow you to register multiple
   redirect URLs 比如：

- Web app and Mobile app
- development service and production service

2. 为了保证安全：必须使用 https 防止在认证过程中 code 被拦截

- 大多数服务 (service) 需要路由完全匹配，这意味着<https://example.com/auth> 的重定向 URL 将与
  <https://example.com/auth?destination=account> 不匹配。所以最佳做法是不在 url 里使用 query
  string parameters
- 少部分服务需要可以从多种 url 发起认证，可以选择注册多个重定向 url，或者改变这些请求的重定向 url，但是 oauth2 提供了一种机制=>
  状态参数 (State) State 的特点

3. State

- 可以用来作为加密的 salt
- 可以是某种随机数据
- 对与 service 来说是不可见的 -> 在初始化认证请求时 (initial authorization request) 传入的任何 State
  都会在用户授权给 app(user authorizes the application) 后被返回

> state 用于额外的安全检查，当 github 返回数据时可以确认不是攻击者发出的请求，比如将攻击者的 authorization token 发送给
> github, as well as SCRF attack

比如：你可以将一个重定向的 url 经过 encode 后 like JWT，在用户返回 app 后解析这个 JWT 将用户带回合适的位置

## 2. Accessing data 获取数据 (github 为例)

```php
$out_app = "在 github 填的 homepage"

$authorizeURL = 'https://github.com/login/oauth/authorize';
// This is the endpoint we'll request an access token from
$tokenURL = 'https://github.com/login/oauth/access_token';
// This is the GitHub base URL for API requests
$apiURLBase = 'https://api.github.com/';
// The URL for this script, used as the redirect URL
$baseURL = 'https://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'];
```

1. 获取登录凭证 (access_token)

```php
   开始
    |
    | 从某处发起 HttpRequest 重定向到 authorizeURL(不一定是 our-app)
    | 携带
    | {
    |     'response_type'= 'code',
    |     'client_id' = $githubClientID,
    |     'redirect_uri' = $baseURL,
    |     'scope' = 'user public_repo',
    |     'status'= 'random_string(10)'
    | }
    ∨
github 认证界面
    |
    | 点击确认
    | if status_send == status_resp:
    |     携带 code 和 status 重定向到 app 界面
    ∨
our-app
    |
    | exchange the authorization code for an access token.
    | 携带
    | {
    |     'grant_type' => 'authorization_code',
    |     'client_id' => $githubClientID,
    |     'client_secret' => $githubClientSecret,
    |     'redirect_uri' => $baseURL,
    |     'code' => $_GET['code']
    | }
    | 再次请求 tokenURL 使用 code 交换 token
    | {
    |     "access_token": "e2f8c8e136c73b1e909bb1021b3b4c29",
    |     "token_type": "Bearer",
    |     "scope": "public_repo,user"
    | }
    | 重定向到 homepage(baseURL)，用户成功登录
    ∨
appHomePage
    |
    | 把 access_token 存入 session，下次进入 app 时就能通过 access_token 进入登录成功后的界面
    ∨
   End
```

2. 利用 access_token 获取数据 直接在 header 里添加 access_token 请求 apiURLBase 就完事了

## 3. Signing in with Google

### 3.1 如何获取用户信息

两个关键词

- authorization 鉴权：trying to gain access or modify something that belongs to
  the user.
- authentication 校验：just verifying who the user is OAuth is designed as a
  authorization protocol(授权协议), 所以 access_token 不能被用来判断用户是谁 有以下几种不同 services 为
  app 提供的方法可以判断用户是谁

1. a simple way: 让 api 顺便返回一些 profile_info(用户信息), 不包含在 OAuth 标准里
2. a advanced approach: use OpenID Connect(an OAuth2.0 extension)
   - 利用 id_token
   - 使用 access_token 如何选择获取 user_info 的方法 A: For performance-sensitive
     applications where you might be reading ID tokens on every request or using
     them to maintain a session, you should definitely validate the ID token
     locally rather than making a network
     request.<https://developers.google.com/identity/protocols/OpenIDConnect#validatinganidtoken>
     B: just for find the user’s name and email after they sign in, then
     extracting the data from the ID token and storing it in your application
     session

### 3.2 下面以 Google 提供的 api 为例

```php
$authorizeURL = 'https://accounts.google.com/o/oauth2/v2/auth';
// This is Google's OpenID Connect token endpoint
$tokenURL = 'https://www.googleapis.com/oauth2/v4/token';
// The URL for this script, used as the redirect URL
$baseURL = 'https://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'];
```

与 github 的不同

1. Google 的认证界面只能选择使用那个帐号 (用户), 没有点击授权的按钮
2. 请求 access_token 的返回值

```json
{
  "access_token": "ya29.Glins-oLtuljNVfthQU2bpJVJPTu",
  "token_type": "Bearer",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZmM2MjkwN
  2E0NDYxODJhZGMxZmE0ZTgxZmRiYTYzMTBkY2U2M2YifQ.eyJhenAi
  OiIyNzIxOTYwNjkxNzMtZm81ZWI0MXQzbmR1cTZ1ZXRkc2pkdWdzZX
  V0ZnBtc3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQi
  OiIyNzIxOTYwNjkxNzMtZm81ZWI0MXQzbmR1cTZ1ZXRkc2pkdWdzZX
  V0ZnBtc3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIi
  OiIxMTc4NDc5MTI4NzU5MTM5MDU0OTMiLCJlbWFpbCI6ImFhcm9uLn
  BhcmVja2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUs
  ImF0X2hhc2giOiJpRVljNDBUR0luUkhoVEJidWRncEpRIiwiZXhwIj
  oxNTI0NTk5MDU2LCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2ds
  ZS5jb20iLCJpYXQiOjE1MjQ1OTU0NTZ9.ho2czp_1JWsglJ9jN8gCg
  WfxDi2gY4X5-QcT56RUGkgh5BJaaWdlrRhhN_eNuJyN3HRPhvVA_KJ
  Vy1tMltTVd2OQ6VkxgBNfBsThG_zLPZriw7a1lANblarwxLZID4fXD
  YG-O8U-gw4xb-NIsOzx6xsxRBdfKKniavuEg56Sd3eKYyqrMA0DWnI
  agqLiKE6kpZkaGImIpLcIxJPF0-yeJTMt_p1NoJF7uguHHLYr6752h
  qppnBpMjFL2YMDVeg3jl1y5DeSKNPh6cZ8H2p4Xb2UIrJguGbQHVIJ
  vtm_AspRjrmaTUQKrzXDRCfDROSUU-h7XKIWRrEd2-W9UkV5oCg"
}
```

下面是前两端的解码信息段

```json
{
  "alg": "RS256",
  "kid": "affc62907a446182adc1fa4e81fdba6310dce63f"
}
{
  "azp": "272196069173-fo5eb41t3nduq6uetdsjdugseutfpmst.apps.googleusercontent.com",
  "aud": "272196069173-fo5eb41t3nduq6uetdsjdugseutfpmst.apps.googleusercontent.com",
  "sub": "117847912875913905493",
  "email": "aaron.parecki@gmail.com",
  "email_verified": true,
  "at_hash": "iEYc40TGInRHhTBbudgpJQ",
  "exp": 1524599056,
  "iss": "https://accounts.google.com",
  "iat": 1524595456
}
```

access_token should be tracted as opaque(不透明), 因为里面没有重要信息 一般来说，提取 id_token
中的信息之前进行校验是很重要的，防止这个 token 是有其他人下发的，在上面的示例中，我们使用了 https 以确保 token 确实来自 Google
sub 是用户的标识符，与帐号绑定，即使更换邮箱也不会变

> 下面是一些解释 azp: 授权演示者的 client_id。仅当请求 ID 令牌的一方与 ID 令牌的受众不同时才需要此声明。aud: 此 ID
> 令牌的目标受众。它必须是您应用程序的 OAuth 2.0 客户端 ID 之一。

## 4 Server-Side Apps

1. 请求 code 时的 queryString

- response_type: 想要获取的返回值类型
- client_id: app 的 identifier
- redirect_url(optional): 授权完成后的跳转页面 (需要在注册 app 时设置)
- scope(optional): Include one or more scope values (space-separated) to request
  additional levels of access. The values will depend on the particular
  service.(用空格分隔)
- status: 会被服务端完整返回，can be used to letyour app persist data between the user
  being directed to the authorization server and back again，

> 比如 using it as session_key to indicate what action the app to perform after
> authorization is complete(比如重定向的链接) 如果每次 request 的 status 都是随机生成的，status
> 也能用来保护 from CSRF

2. 交换 access_token 的 queryString

- grant_type(required): 必须要设置为 authorization_code
- code(required): will be in the query string parameter “code” in this request.
- redirect_uri (possibly required)
- Client Authentication (required): 一般是 client_id 和 client_secret
