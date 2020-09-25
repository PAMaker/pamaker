협업하며 꼭 지켜야 할 규칙
--------------------------
merge conflict 피하기 위해서 로컬의 소스를 늘 최신으로 갖춰야함!
> git pull --rebase upstream master

실수를 했지만 이미 commit 과 push를 했을시
--------------------------

 복구하기
> git revert(전단계 commit 번호) 

# pull request 를 위해 해야할것
------------------------------

 본인의 repo 를 = local repo / 팀의 repo 를 = remote repo 
> pull request 를 하기위해서는 remote repo 에서 forked 해서 local repo를 만들어야함
> forked 한 local repo 를 다시 프로젝트에 등록시키기

``` 
git remote remove origin
git remote add origin "local repo 깃 주소"
ex)git remote add origin https://githuv.com/Semy-sudo/pamaker
```
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

`<u>master 브랜치는 local이든 remote 이든 관리만 한다는 것이 핵심!!</u>`
