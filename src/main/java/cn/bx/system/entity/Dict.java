package cn.bx.system.entity;

import cn.bx.bframe.entity.BaseBean;

public class Dict extends BaseBean{
	private static final long serialVersionUID = 1L;
	private String value;	// 数据值
	private String name;	// 标签名
	private String type;	// 类型
	private String typeDesc; //类型说明
	private String remarks; //备注
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTypeDesc() {
		return typeDesc;
	}
	public void setTypeDesc(String typeDesc) {
		this.typeDesc = typeDesc;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
}
