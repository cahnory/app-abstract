# App Abstract <!-- omit in toc -->

- [Development](#development)
  - [Enable HTTPS](#enable-https)
    - [Generate certificates](#generate-certificates)
    - [Verify certificate](#verify-certificate)
- [Production](#production)
  - [Enable HTTPS](#enable-https-1)

## Development

### Enable HTTPS

#### Generate certificates

Open the project root directory in terminal and run the following command:

```sh
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

This should create `localhost.crt` and `localhost.key` files which should be ignored by git.

OpenSSL is required and is downloadable on [openssl.org](https://www.openssl.org/)

#### Verify certificate

Once you generated certificate, the browser may not trust it because it has not been verified. To fix this you have to add your certificate to the trust anchor list. This could be done at browser level but we'll do it system wide.

On _OS X_:

1. open Keychain Access (`Application/Utilities/Keychain Access.app`).
2. drag your `localhost.cert` in it. It should appear in the **Certificates** category.
3. find newly added localhost certificate in the **Certificates** list and double click on it.
4. select **Always trust** in the **trust** section and close.

## Production

### Enable HTTPS

Create and/or open `.env` file in the _app-abstract-server_ package and set the path to you key and certificate:

```env
HTTPS_KEY_PATH  = /path/to/your/key.key
HTTPS_CERT_PATH = /path/to/your/certificate.crt
```
