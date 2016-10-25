package cn.bx.system.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.SimpleService;
import cn.bx.system.entity.Dict;

@Service("DictService")
@Transactional(rollbackFor=Exception.class)
public class DictService extends SimpleService<Dict>{
	public List<Dict> findDictByType(String type){
		return this.selectList("findDictByType", type);
	}
}
