package cn.bx.system.entity;


import cn.bx.bframe.entity.TreeBean;

public class Menu extends TreeBean<Menu>{
	private static final long serialVersionUID = 1L;
	private String name; 	// 名称
	private String target; 	// 链接
	private String icon; 	// 图标
	private String type; 	// 0:模块 1:功能
	private String permission; // 权限标识
	public Menu(){
		super();
		this.type = "0";
	}
	public Menu getParent() {
		return parent;
	}
	public void setParent(Menu parent) {
		this.parent = parent;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
}
