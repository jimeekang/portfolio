# portfolio

Jimee's portfolio
.....

아무리 미디어 쿼리를 설정하더라도 뷰포트를 설정하지않으면, 미디어 쿼리가 정상적으로 작동하지 않는다.

그 이유는 미디워 쿼리는 기기의 가로길이 ( width ) 에 반응하여 작동을 하는것인데, 뷰포트를 설정하지 않으면 스마트폰으로 접속시에도 가로 길이가 PC처럼 큰 값으로 측정되기 때문이다.

따라서 다음과 같이 html 의 head 안쪽에 뷰포트를 설정해야 미디어 쿼리가 정상적으로 작동한다.

<head>

    <meta name="viewport" content="width=device-width,initial-scale=1" />

</head>
