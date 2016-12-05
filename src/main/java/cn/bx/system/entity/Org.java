package cn.bx.system.entity;

import cn.bx.bframe.entity.TreeBean;

public class Org extends TreeBean<Org>{
	private static final long serialVersionUID = 1L;
	private String name;//名称
	private String type;//类型 1公司 2部门
	private String addr;//地址
	private User master;//负责人
	
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
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public User getMaster() {
		return master;
	}
	public void setMaster(User master) {
		this.master = master;
	}
	@Override
	public Org getParent() {
		return parent;
	}
	@Override
	public void setParent(Org parent) {
		this.parent = parent;
	}

}
