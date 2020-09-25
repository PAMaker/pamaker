pull request 를 위해 해야할것
------------------------------


0. local 저장소 = 내pc에 파일이 저장되는 개인 저장소//remote repository = github에서 관리되는 본인 원격 저장소//중앙 remote ropository = 팀의 원격 저장소


1. pull request 를 하기위해서는 중앙 remote repo 에서 forked 해서 본인 remote repo를 만들어야함
2. forked 한 본인 remote repo 를 다시 프로젝트에 등록시키기

``` 
git remote remove origin
git remote add origin "local repo 깃 주소"
ex)git remote add origin https://githuv.com/Semy-sudo/pamaker
```

협업하며 꼭 지켜야 할 규칙
--------------------------

> 본인이 작업할 독립된 브랜치 만들기
```
git branch brchA
```

> 본인이 만든 브랜치로 이동하여 작업
```
git checkour brchA
```

> 구현을 마친뒤 master branch 에 병합
```
git add .
git commit -m "기능구현완료"


git checkout master
git merge brchA
git push origin master
```

**master 브랜치는 local이든 remote 이든 관리만 한다는 것이 핵심!!**


-------------------------------------------------------------------


> merge conflict 피하기 위해서 작업전 로컬의 소스를 늘 최신으로 갖춰야함!
```
git pull --rebase upstream master
```




