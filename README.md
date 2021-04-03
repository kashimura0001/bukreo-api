# Set up
```
$ docker-compose up -d
$ yarn install
$ yarn start:dev
$ open http://localhost:3000/graphql
```

# 認証を行うユーザーを指定する
FirebaseAuthのユーザーIDを`.env.development`の`FIREBASE_DEV_USER_UID`に設定すると、指定したユーザーで認証を通すことができます。
