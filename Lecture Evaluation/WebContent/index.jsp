<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="EUC-KR">
<meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no">
<title>강의평가 웹사이트</title>
<!-- 부트스트랩 CSS추가하기 -->
<link rel="stylesheet" href="./css/bootstrap.min.css">
<!-- 커스텀  CSS추가하기 -->
<link rel="stylesheet" href="./css/custom.css">
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="index.jsp">사진 후기 웹사이트</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
			<span class="navbar-toggler" type="button" data-toggle="collapse"></span>
		</button>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active"><a class="nav-link"
					href="index.jsp">메인</a></li>
				<li class="nav-link dropdown">
				<a class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown"></a>
					<div class="dropdown-menu" aria-labelledby="dropdown">
						<a class="dropdown-item" href="userLogin.jsp">로그인</a> 
						<a class="dropdown-item" href="userjoin.jsp">회원가입</a> 
						<a class="dropdown-item" href="userLogout.jsp">로그아웃</a>
					</div></li>
			</ul>
			<form class="form-inline my-2 my-lg-0">
				<input class="form-control mr-sm-2" type="search" placeholder="내용을 입력하세요" aria-label="Search">
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">검색</button>
			</form>
		</div>
	</nav>
	<section class="container">
		<form method="get" action="./index.jsp" class="form-inline mt-3">
			<select name="lectureDivide" class="form-contorl mx-1 mt-2">
				<option value="전체">전체</option>
				<option value="전공">전공</option>
				<option value="교양">교양</option>
				<option value="기타">기타</option>
			</select> 
			<input type="text" name="search" class="form-control mx-1 mt-2"placeholder="내용을 입력하세요">
			<button type="submit" class="btn btn-primary mx-1 mt-2">검색</button>
			<a class="btn btn-primary mx-1 mt-2" data-toggle="modal" href="#registerModal">등록하기</a> 
			<a class="btn btn-danger mx-1 mt-2" data-toggle="modal" href="#reportModal">신고하기</a>
		</form>
		
		<div class="card bh-light mt-3">
			<div class="card-header bg-light">
				<div class="row">
					<div class="col-8 text-left">압구정&nbsp;<small>송예인</small></div>
						<div class="col-4 text-right">
							종합<span style="color: red;">A</span>
						</div>
					</div>
				</div>
			<div class="card-body">
				<h5 class="card-title">
					정말 좋은 작가님이에요.&nbsp;<small>(2020년 6월)</small>
				</h5>
				<p class="card-text">촬영이 너무 장비가 없어서 문제에요</p>
				<div class="row">
					<div class="col-9 text-left">
						성적<span style="color:red">A</span>
						성적<span style="color:red">A</span>
						성적<span style="color:red">A</span>
						<span style="color: green;">(추천:15)</span>
					</div>
					<div class="col-3 text-right">
						<a onclick="return confirm('추천하시겠습니까?')" href="./likeAction.jsp?evaluationID=">추천</a>
						<a onclick="return confirm('삭제하시겠습니까?')" href="./deleteAction.jsp?evaluationID=">추천</a>
					</div>
					
					</div>
			</div>
		</div>
		
	</section>
	
	
	
	<!-- 등록하기 -->
	<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal">평가 등록</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form action="./evaluationRegisterAction.jsp" method="post">
						<div class="form-row">
							<div class="form-group col-sm-6">
								<label>컨셉명</label> <input type="text" name="lectureName" class="form-control" maxlength="20"></label>
							</div>
							<div class="form-group col-sm-6">
								<label>작가명</label> <input type="text" name="lectureName" class="form-control" maxlength="20"></label>
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-sm-4">
								<label>년도</label> <select name="lectureYear"
									class="form-control">
									<option value="2011">2011</option>
									<option value="2012">2012</option>
									<option value="2013">2013</option>
									<option value="2014">2014</option>
									<option value="2015">2015</option>
									<option value="2016">2016</option>
									<option value="2017">2017</option>
									<option value="2018">2018</option>
									<option value="2019">2019</option>
									<option value="2020" selected>2020</option>
									<option value="2021">2021</option>
									<option value="2022">2022</option>
								</select>
							</div>
							</div>
							<div class="form-group col-sm-4">
								<label> 월</label> <select name="lectureMonth"
									class="form-control">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10" selected>10</option>
									<option value="11">11</option>
									<option value="12">12</option>
								</select>
							</div>
							<div class="form-group col-sm-4">
								<label>컨셉구분</label> <select name="lectureDivide"
									class="form-control">
									<option value="프로필" selected>프로필</option>
									<option value="가족">가족</option>
									<option value="웨딩">웨딩</option>
								</select>
							</div>
						<div class="form-group">
							<label>제목</label> <input type="text" name="evaluationTime"
								class="form-control" maxlength="40">
						</div>
						<div class="form-group">
							<label>내용</label>
							<textarea name="evaluationContent" class="form-control"
								maxlength="200"></textarea>
						</div>
						<div class="form-row">
							<div class="form-group col-sm-3">
								<label>친절함</label> <select name="totalScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
						</div>
							<div class="form-group col-sm-3">
								<label>적합함</label> <select name="creditScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
							<div class="form-group col-sm-3">
								<label>편리함</label> <select name="comfortableScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
							<div class="form-group col-sm-3">
								<label>서비스</label> <select name="comfortableScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">취소</button>
							<button type="submit" class="btn btn-primary">등록하기</button>
						</div>
				</form>
			</div>
			</div>
		</div>

	</div>
	<!-- 신고하기 -->
	<div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal">신고 하기</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form action="./reportAction.jsp" method="post">
						<div class="form-group">
							<label>신고 제목</label> 
							<input type="text" name="reportTitle" class="form-control" maxlength="40">
						</div>
						<div class="form-group">
							<label>신고 내용</label>
							<textarea name="evaluationContent" class="reportContent" maxlength="200"></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
							<button type="submit" class="btn btn-danger">신고하기</button>
						</div>
				  </form>
			</div>

		</div>

	</div>
</div>
<footer class="bg-dark mt-4 p-5 text-center" style="color: #FFFFF;">
	Copyright &copy; 2018송예인 All Right Reserved.
</footer>

	<!-- 제이쿼리 자바스크립트 추가하기 -->
	<script src="./js/jquery.min.js"></script>
	<!-- 파퍼 자바스크립트 추가하기 -->
	<script src="./js/pooper.js"></script>
	<!-- 제이쿼리 자바스크립트 추가하기 -->
	<script src="./js/bootstrap.min.js"></script>







</body>
</html>