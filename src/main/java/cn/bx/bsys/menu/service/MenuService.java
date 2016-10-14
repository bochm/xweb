package cn.bx.bsys.menu.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.DefaultTreeService;
import cn.bx.bsys.menu.mapper.Menu;
import cn.bx.bsys.menu.mapper.MenuMapper;

@Service("MenuService")
@Transactional(rollbackFor=Exception.class)
public class MenuService extends DefaultTreeService<MenuMapper,Menu>{
}
