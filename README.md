# practice-min-perfect-hash

DB에 넣는 id에 대해서 겹치지 않는 코드를 만들기 위한 hash 함수다.
여기서는 6자리 코드로 만드는 것을 가정하기 때문에 범위는 $[0, N^6 - 1]$ 이다.
여기서 N은 character set의 길이다.
