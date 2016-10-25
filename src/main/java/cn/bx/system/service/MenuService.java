package cn.bx.system.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.DefaultTreeService;
import cn.bx.system.entity.Menu;
import cn.bx.system.mapper.MenuMapper;

@Service("MenuService")
@Transactional(rollbackFor=Exception.class)
public class MenuService extends DefaultTreeService<MenuMapper,Menu>{
}
