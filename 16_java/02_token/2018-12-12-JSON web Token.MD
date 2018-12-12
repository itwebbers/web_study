# 什么是 JSON web Token？

>     JSON web Token (JWT) 是开放标准（[RFC 7591](https://tools.ietf.org/html/rfc7519)）,它定义了一种紧凑且独立的方式，可以在各个端之间作为 JSON 对象安全的传输信息。此信息可以通过数字签名进行验证和信任。JWT 可以使用一种加密方式（例如：使用 HMAC 算法）或使用 RSA 或 ECDSA 的公钥/私钥进行签名。
>      虽然JWT可以加密在各个端之间提供保密，但我们将专注于签名的token。签名的token可以验证其中包含的声明的完整性，而加密令牌则隐藏其他地方的声明。当使用公钥/私钥对签署令牌时，签名还要证明只有持有私钥的一方是签署私钥的一方。

## JSON web Token 的使用场景

- `授权`: 这是使用 JWT 的最常见方案，一旦用户登陆，每个后续请求将包含 JWT，允许用户访问该令牌的路由，服务和资源。Single Sign On 是一种现在广泛使用 JWT 的功能，因为它们的开销小，并且能够在不同的域中轻松使用（跨域）。
- `信息交换`： JSON web Token 是在各方之间安全传输信息的好方法。因为 JWT 可以签名。例如： 使用对应的公钥/私钥，您可以确定发件人是否是他们说的人。此外，由于使用 http header 和有效负载计算签名，您还可以验证内容是否被篡改。

## JSON web Token 的结构

<p>在其紧凑的形式中，JSON web Token由三部分组成（由（.）分隔）如下：</p>

- Header
- Payload
- Signature

> JWT 的表示通常如：
> HHHH.PPPP.SSSS

1.  Header

> 标头通常由两部分组成： token 的类型，即 JWT，以及正在使用的散列算法，例如：HMAC SHA256 或 RSA

```JSON
  {
    "alg": "RSA",
    "typ": "JWT"
  }
```

> 接着，这个 JSON 被编码成 BASE64URl，形成 JWT 的第一部分

2. Payload

> token 的第二组成部分，其中包含声明。声明是关于实体（通常是用户）和其他数据的声明。索赔由三种类型：注册，公开和私人索赔。

- `已经注册了的声明`: 这些是一组预定义的声明，不是强制性的，但建议使用，以提供一组有用的，可相互操作的声明。例如（部分）：

  - iss： 发行人
  - exp： 到期时间
  - sub： 主题
  - aud： 观众
    <font color=red>注意： 声明名称只有三个字符，因为 JWT 意味着紧凑</font>

- 公开声明： 这些可以由使用 JWT 的人随意定义。但是为规避冲突，应在 IANA JSON Web Token 注册表中定义他们，或者将其定义为包含防冲突命名空间的 URL。
- 私人索赔： 这是创建共享统一使用它们，并既不是当事人之间的信息自定义声明注册或公众的权力要求。
- 示例：

```JSON
  {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
  }
```

> 然后，有效负载经过 Base64Url 编码，形成 JSON Web 令牌的第二部分
> <font color=red>请注意，对于签名令牌，此信息虽然可以防止被篡改，但任何人都可以读取。除非加密，否则不要将秘密信息放在 JWT 的有效负载或头元素中。</font>

3. Signature

> 要创建签名部分，您必须采用编码标头，编码的有效负载，秘密，标头中指定的算法，并对其进行签名

- 例如，如果要使用 HMAC SHA256 算法，将按以下方式创建签名：

```JSON
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
```

> 签名用于验证消息在此过程中未被更改，并且，在使用私钥签名的令牌的情况下，它还可以验证 JWT 的发件人是否是它所声称的人。

## 把三个部分组合到一起

> 输出是三个由点分隔的 Base64-URL 字符串，可以在 HTML 和 HTTP 环境中轻松传递，与 SAML 等基于 XML 的标准相比更加紧凑

- 例如：

```JSON
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### JSON Web Token 如何工作？

> 在身份验证中，当用户使用其凭据成功登陆时，将返回 JSON Web Token。由于 token 是凭证，因此必须非常小心以防止出现安全问题，一般情况下，您不应该将令牌保留的时间超过要求。

<p>每当用户想要访问受保护的路由或者资源时，用户代理应该使用Bearer模式发送JWT，通常在Authorition标头中，表头的内容如下：</p>

```JSON
 Authorization: Bearer <token>
```

> 在某些情况下，这可以是无状态授权机制，服务器的受保护路由将检查 `Authorization` 标头中有效的 JWT，如果存在，则允许用户访问受保护资源。如果 JWT 包含必要的数据，则减少查询数据库以进行某些操作的需要，尽管可能并非总是如此。
> 如果在标`Authorization`头中发送令牌，则跨域资源共享（CORS）将不会成为问题，因为它不使用 cookie。

<p>下图显示了如何获取JWT并用于访问API或资源：</p>

> ![JWT 获取 API 或资源](../../assets/images/client-credentials-grant.png)

> 1.应用程序或客户端向授权服务器请求授权。这是通过其中一个不同的授权流程执行的。例如，典型的 OpenID Connect 兼容 Web 应用程序将/oauth/authorize 使用授权代码流通过端点。
>
> 2. 授予授权后，授权服务器会向应用程序返回访问令牌。
> 3. 应用程序使用访问令牌来访问受保护资源（如 API）。

<font color=red>请注意，使用签名令牌，令牌中包含的所有信息都会向用户或其他方公开，即使他们无法更改。这意味着您不应该在令牌中放置秘密信息。</font>

### 我们为什么要使用 JSON Web Toaken

> 让我们来谈谈域简单 web token （SWT）和安全断言标记语言令牌（SAML）相比，JSON Web Toaken （JWT）的好处

<p>由于JSON比XML更简洁，因此在编码时它的大小也更小，使得JWT比SAML更紧凑。这使得JWT成为在HTML和HTTP环境中传递的不错的选择</p>

<p>在安全方面，SWT只能使用HMAC算法通过共享密钥对称签名。但是，JWT和SAML token可以使用X.509证书形式的公钥/私钥进行签名，与签名JSON的简单性相比，使用XML数字签名对XML进行签名而不会进入模糊的安全漏洞非常困难</p>

<p>JSON解析器在大多数编程语言中很常见，因为它们直接映射到对象，相反，XML没有自然的文档到对象映射。这使得使用JWT比使用SAML断言更容易</p>

<p>关于使用，JWT用户互联网规模，这突出了在多个平台（尤其是移动平台）上轻松进行（JSON web Token）的客户端处理</p>

![比较编码的JWT和编码的SAML的长度](../../assets/images/comparing-jwt-vs-saml2.png)

<font color="#cccccc">比较编码的 JWT 和编码的 SAML 的长度<font>
