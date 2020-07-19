<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="EUC-KR">
<meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no">
<title>������ ������Ʈ</title>
<!-- ��Ʈ��Ʈ�� CSS�߰��ϱ� -->
<link rel="stylesheet" href="./css/bootstrap.min.css">
<!-- Ŀ����  CSS�߰��ϱ� -->
<link rel="stylesheet" href="./css/custom.css">
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="index.jsp">���� �ı� ������Ʈ</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
			<span class="navbar-toggler" type="button" data-toggle="collapse"></span>
		</button>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active"><a class="nav-link"
					href="index.jsp">����</a></li>
				<li class="nav-link dropdown">
				<a class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown"></a>
					<div class="dropdown-menu" aria-labelledby="dropdown">
						<a class="dropdown-item" href="userLogin.jsp">�α���</a> 
						<a class="dropdown-item" href="userjoin.jsp">ȸ������</a> 
						<a class="dropdown-item" href="userLogout.jsp">�α׾ƿ�</a>
					</div></li>
			</ul>
			<form class="form-inline my-2 my-lg-0">
				<input class="form-control mr-sm-2" type="search" placeholder="������ �Է��ϼ���" aria-label="Search">
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">�˻�</button>
			</form>
		</div>
	</nav>
	<section class="container">
		<form method="get" action="./index.jsp" class="form-inline mt-3">
			<select name="lectureDivide" class="form-contorl mx-1 mt-2">
				<option value="��ü">��ü</option>
				<option value="����">����</option>
				<option value="����">����</option>
				<option value="��Ÿ">��Ÿ</option>
			</select> 
			<input type="text" name="search" class="form-control mx-1 mt-2"placeholder="������ �Է��ϼ���">
			<button type="submit" class="btn btn-primary mx-1 mt-2">�˻�</button>
			<a class="btn btn-primary mx-1 mt-2" data-toggle="modal" href="#registerModal">����ϱ�</a> 
			<a class="btn btn-danger mx-1 mt-2" data-toggle="modal" href="#reportModal">�Ű��ϱ�</a>
		</form>
		
		<div class="card bh-light mt-3">
			<div class="card-header bg-light">
				<div class="row">
					<div class="col-8 text-left">�б���&nbsp;<small>�ۿ���</small></div>
						<div class="col-4 text-right">
							����<span style="color: red;">A</span>
						</div>
					</div>
				</div>
			<div class="card-body">
				<h5 class="card-title">
					���� ���� �۰����̿���.&nbsp;<small>(2020�� 6��)</small>
				</h5>
				<p class="card-text">�Կ��� �ʹ� ��� ��� ��������</p>
				<div class="row">
					<div class="col-9 text-left">
						����<span style="color:red">A</span>
						����<span style="color:red">A</span>
						����<span style="color:red">A</span>
						<span style="color: green;">(��õ:15)</span>
					</div>
					<div class="col-3 text-right">
						<a onclick="return confirm('��õ�Ͻðڽ��ϱ�?')" href="./likeAction.jsp?evaluationID=">��õ</a>
						<a onclick="return confirm('�����Ͻðڽ��ϱ�?')" href="./deleteAction.jsp?evaluationID=">��õ</a>
					</div>
					
					</div>
			</div>
		</div>
		
	</section>
	
	
	
	<!-- ����ϱ� -->
	<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal">�� ���</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form action="./evaluationRegisterAction.jsp" method="post">
						<div class="form-row">
							<div class="form-group col-sm-6">
								<label>������</label> <input type="text" name="lectureName" class="form-control" maxlength="20"></label>
							</div>
							<div class="form-group col-sm-6">
								<label>�۰���</label> <input type="text" name="lectureName" class="form-control" maxlength="20"></label>
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-sm-4">
								<label>�⵵</label> <select name="lectureYear"
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
								<label> ��</label> <select name="lectureMonth"
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
								<label>��������</label> <select name="lectureDivide"
									class="form-control">
									<option value="������" selected>������</option>
									<option value="����">����</option>
									<option value="����">����</option>
								</select>
							</div>
						<div class="form-group">
							<label>����</label> <input type="text" name="evaluationTime"
								class="form-control" maxlength="40">
						</div>
						<div class="form-group">
							<label>����</label>
							<textarea name="evaluationContent" class="form-control"
								maxlength="200"></textarea>
						</div>
						<div class="form-row">
							<div class="form-group col-sm-3">
								<label>ģ����</label> <select name="totalScore"
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
								<label>������</label> <select name="creditScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
							<div class="form-group col-sm-3">
								<label>������</label> <select name="comfortableScore"
									class="form-control">
									<option value="A" selected>A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="F">F</option>
								</select>
							</div>
							<div class="form-group col-sm-3">
								<label>����</label> <select name="comfortableScore"
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
								data-dismiss="modal">���</button>
							<button type="submit" class="btn btn-primary">����ϱ�</button>
						</div>
				</form>
			</div>
			</div>
		</div>

	</div>
	<!-- �Ű��ϱ� -->
	<div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal">�Ű� �ϱ�</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form action="./reportAction.jsp" method="post">
						<div class="form-group">
							<label>�Ű� ����</label> 
							<input type="text" name="reportTitle" class="form-control" maxlength="40">
						</div>
						<div class="form-group">
							<label>�Ű� ����</label>
							<textarea name="evaluationContent" class="reportContent" maxlength="200"></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">���</button>
							<button type="submit" class="btn btn-danger">�Ű��ϱ�</button>
						</div>
				  </form>
			</div>

		</div>

	</div>
</div>
<footer class="bg-dark mt-4 p-5 text-center" style="color: #ffffff;">
	Copyright &copy; 2018�ۿ��� All Right Reserved.
</footer>

	<!-- �������� �ڹٽ�ũ��Ʈ �߰��ϱ� -->
	<script src="./js/jquery.min.js"></script>
	<!-- ���� �ڹٽ�ũ��Ʈ �߰��ϱ� -->
	<script src="./js/pooper.js"></script>
	<!-- �������� �ڹٽ�ũ��Ʈ �߰��ϱ� -->
	<script src="./js/bootstrap.min.js"></script>







</body>
</html>