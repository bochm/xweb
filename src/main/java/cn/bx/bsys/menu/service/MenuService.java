package cn.bx.bsys.menu.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.SimpleService;
import cn.bx.bsys.menu.mapper.Menu;

@Service("MenuService")
@Transactional(rollbackFor=Exception.class)
public class MenuService extends SimpleService<Menu>{
}
