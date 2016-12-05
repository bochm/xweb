package cn.bx.system.entity;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.druid.util.StringUtils;

import cn.bx.bframe.entity.BaseBean;

public class Role extends BaseBean{
	private static final long serialVersionUID = 1L;
	// 数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；6：仅本人数据；9：按明细设置）
	public static final String DATA_SCOPE_ALL = "1";
	public static final String DATA_SCOPE_COMPANY_AND_CHILD = "2";
	public static final String DATA_SCOPE_COMPANY = "3";
	public static final String DATA_SCOPE_DEPT_AND_CHILD = "4";
	public static final String DATA_SCOPE_DEPT = "5";
	public static final String DATA_SCOPE_SELF = "6";
	public static final String DATA_SCOPE_CUSTOM = "9";
	private String name;
	private String enname;
	private String roleType;
	private String dataScope;
	private List<Menu> menuList = new ArrayList<Menu>(); //菜单列表
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEnname() {
		return enname;
	}
	public void setEnname(String enname) {
		this.enname = enname;
	}
	public String getRoleType() {
		return roleType;
	}
	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}
	public String getDataScope() {
		return dataScope;
	}
	public void setDataScope(String dataScope) {
		this.dataScope = dataScope;
	}
	public List<Menu> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}
	/**
	 * 获取权限字符串列表
	 */
	public List<String> getPermissions() {
		List<String> permissions = new ArrayList<String>();
		for (Menu menu : menuList) {
			if (!StringUtils.isEmpty(menu.getPermission())){
				permissions.add(menu.getPermission());
			}
		}
		return permissions;
	}
}
