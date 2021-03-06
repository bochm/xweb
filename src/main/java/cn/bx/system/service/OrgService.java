package cn.bx.system.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.DefaultTreeService;
import cn.bx.system.entity.Org;
import cn.bx.system.mapper.OrgMapper;

@Service("OrgService")
@Transactional(rollbackFor=Exception.class)
public class OrgService extends DefaultTreeService<OrgMapper,Org>{
}
