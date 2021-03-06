<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<h4>可用标签</h4>
<pre class="prettyprint">&lt;span class="label label-default"&gt; Default&lt;/span&gt;</pre>
<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th>标签</th>
			<th>Class</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><span class="label label-default"> Default</span></td>
			<td><code> label label-default </code></td>
		</tr>
		<tr>
			<td><span class="label label-success"> Success</span></td>
			<td><code> label label-success </code></td>
		</tr>
		<tr>
			<td><span class="label label-warning"> Warning</span></td>
			<td><code> label label-warning; </code></td>
		</tr>
		<tr>
			<td><span class="label label-danger"> Danger</span></td>
			<td><code> label label-danger </code></td>
		</tr>
		<tr>
			<td><span class="label label-info"> Info</span></td>
			<td><code> label label-info </code></td>
		</tr>
		<tr>
			<td><span class="label label-inverse"> Inverse</span></td>
			<td><code> label label-inverse </code></td>
		</tr>
	</tbody>
</table>
<h4>可用徽章</h4>
<pre class="prettyprint">&lt;span class="badge badge-success"&gt; 2&lt;/span&gt;</pre>
<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th class="hidden-xs">名称</th>
			<th>例子</th>
			<th>Class</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="hidden-xs"> Default </td>
			<td><span class="badge"> 1</span></td>
			<td><code> badge badge-default </code></td>
		</tr>
		<tr>
			<td class="hidden-xs"> Success </td>
			<td><span class="badge badge-success"> 2</span></td>
			<td><code> badge badge-success </code></td>
		</tr>
		<tr>
			<td class="hidden-xs"> Warning </td>
			<td><span class="badge badge-warning"> 4</span></td>
			<td><code> badge badge-warning </code></td>
		</tr>
		<tr>
			<td class="hidden-xs"> Danger </td>
			<td><span class="badge badge-danger"> 6</span></td>
			<td><code> badge badge-danger </code></td>
		</tr>
		<tr>
			<td class="hidden-xs"> Info </td>
			<td><span class="badge badge-info"> 8</span></td>
			<td><code> badge badge-info </code></td>
		</tr>
		<tr>
			<td class="hidden-xs"> Inverse </td>
			<td><span class="badge badge-inverse"> 10</span></td>
			<td><code> badge badge-inverse </code></td>
		</tr>
	</tbody>
</table>
<script type="text/javascript">
require(['app/common'],function(APP){
	$("pre").addClass("prettyprint");
    prettyPrint();
})
</script>