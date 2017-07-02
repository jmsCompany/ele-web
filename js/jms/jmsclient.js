(function($, window, document,undefined) {


    $clientURL = "http://192.168.1.105:9997/ele/"
   //$clientURL = "http://118.178.94.7:9997/ele/"
   //$clientURL = "http://localhost:9997/ele/"
   //  $clientURL = "http://192.168.1.103:9997/ele/"
	//$.fn.dataTable.ext.errMode = 'throw';

    $.JMSClient = function (path,opt,callback) {
      var defaults = {
                     'url':        $clientURL+path,
                     'type':        'GET',
                     'dataType':    'json',
                     'contentType': 'application/json; charset=UTF-8',
                     'data':         {},
                     headers:      {},
                     processData:   true

        };
     var options = $.extend({}, defaults, opt);
        //hxg 兼容上传文件操作
       $.ajax({
            url:          options.url,
            type:         options.type,
            dataType:     options.dataType,
            contentType:  options.contentType,
            data:         options.data,
            headers:      options.headers,
            processData:  options.processData,
		    beforeSend:function(XMLHttpRequest){
		    	$('#body-center').block({
				    message: '数据加载中。。。',
                   	css: {
						border: 'none',
						padding: '15px',
						backgroundColor: '#000',
						'-webkit-border-radius': '10px',
						'-moz-border-radius': '10px',
						opacity: .5,
						color: '#fff'
                    }
		    	});
		    },
         	error: function(XMLHttpRequest, textStatus, errorThrown) {
               $('#body-center').unblock();
               //  alert(XMLHttpRequest.status);
               //  alert(textStatus);
              //   alert('error');
            },
         	complete:function(XMLHttpRequest, textStatus){
         		$('#body-center').unblock();
           	},
            success: function(data, textStatus){
                $('#body-center').unblock();
                callback && callback(data);
            }
        });
    };

    //在插件中使用Select对象
    $.fn.selectautofill = function(path,options,callback) {
        var t = this;
        $.JMSClient(path,options,function(data){
        	t.empty();
            $(data).each(function(i, val){
                t.append($('<option value='+val.id+'>'+val.name+'</option>'));
            });

            //加一个异步操作
			if(callback && typeof callback == 'function') {
				callback(data);
			}
        });
    };

     //scroll
     $.jmsscroll = function(path,pagerequest,jmstoken,callback){
            $.JMSClient(path,{'type':'POST',data:pagerequest,headers:{'JMS-TOKEN':jmstoken}},callback);


     };

     //检查jms-token是否过期
     $.checktoken = function(jmstoken,callback){
            $.JMSClient('check/jmstoken',{data:{jmstoken:jmstoken}},callback);

     };

     //0. 登录
     $.login = function(wsUser,callback){
             $.JMSClient('login',{'type':'POST',data:wsUser},callback);

     };

     //保存字典
     $.saveDic = function(data,callback){
		  $.JMSClient('sys/dic/saveDic',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
     };

     //保存流程
     $.saveSteps = function(data,callback){
		  $.JMSClient('sys/steps/saveSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存员工
     $.saveUser = function(data,callback){
		  $.JMSClient('sys/user/saveUser',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存员工密码
     $.saveUserPwd = function(data,callback){
		  $.JMSClient('sys/user/updateUserPasswordByAdmin',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存消息
     $.saveNoti = function(data,callback){
		  $.JMSClient('sys/noti/saveNoti',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存区域
     $.saveLocation = function(id,callback){
		  $.JMSClient('sys/location/changeStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:'subSubLocationId='+id+'&enabled=1'},callback);
      };

     //保存权限
     $.savePermission = function(data,callback){
		  $.JMSClient('sys/role/saveRolePermissions',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存签字
      $.saveSign = function(data,callback){
      $.JMSClient('sys/sign/saveSignWorkflowSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存项目
      $.saveProj = function(data,callback){
		//  debugger;
      $.JMSClient('project/saveProject',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };
      //项目初始化的时候的填值
      $.initProj = function(formId,projId,callback){
        $.JMSClient('project/getForm'+formId,{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projectId:projId}},callback);
      };
      //保存项目进度
      $.saveProjSteps = function(data,callback){
      $.JMSClient('project/saveProjectSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存表单
      $.saveForm = function(formId,data,callback){
      $.JMSClient('project/saveForm'+formId,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //读取表单
      $.readForm = function(formId,projId,callback){
      $.JMSClient('project/getForm'+formId,{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projectId:projId}},function(data){callback(data)});
      };

      //保存销售跟踪单
      $.saveSaleForm = function(data,callback){
      $.JMSClient('project/saveSoTrack',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //读取销售跟踪单
      $.readSaleForm = function(projId,callback){
      $.JMSClient('project/getSoTrack',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projectId:projId}},function(data){callback(data)});
      };

     //删除字典
     $.delDic = function(id,callback){
		  $.JMSClient('sys/dic/deleteDic',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{dicId:id}},callback);
      };

     //删除流程
     $.delSteps = function(id,callback){
		  $.JMSClient('sys/steps/deleteSteps',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{stepsId:id}},callback);
      };

     //删除员工
     $.delUser = function(id,callback){
		  $.JMSClient('sys/user/deleteUsers',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{username:id}},callback);
      };

     //删除区域
     $.delLocation = function(id,callback){
      $.JMSClient('sys/location/changeStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{subSubLocationId:id, enabled:0}},callback);
      };

     //删除签字
     $.delSign = function(id,callback){
      $.JMSClient('sys/sign/deleteSignWorkflowStep',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{signWorkflowStepId:id}},callback);
      };

     //删除项目
     $.delProj = function(id,callback){
		  $.JMSClient('project/deleteProject',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{idProject:id}},callback);
      };


	//用户自己保存密码
	$.saveUserPassword1=function(userPassword,jmstoken,callback){
		$.JMSClient('sys/user/updateUserPassword',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:userPassword},callback);
	};


     //NEW-END



    //7.注册公司
    $.registCompany = function(wsCompany,callback){
    	   // alert('reg!');
             $.JMSClient('company/create',{'type':'POST',data:wsCompany},callback);

     };

	//保存成本中心
	   $.saveCostCenter=function(costCenter,jmstoken,callback){
		  $.JMSClient('s/saveCostCenter',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:costCenter},callback);
      };
	  //显示成本中心
	   $.costCenterInfo = function(costCenterId,jmstoken,callback){
          $.JMSClient('s/findCostCenter',{headers:{'JMS-TOKEN':jmstoken},data:{costCenterId:costCenterId}},callback);
      };
      //删除成本中心
	  $.deleteCostCenter = function(costCenterId,jmstoken,callback){
          $.JMSClient('s/deleteCostCenter',{headers:{'JMS-TOKEN':jmstoken},data:{costCenterId:costCenterId}},callback);
      };
	//保存角色
	$.saveRole=function(role,jmstoken,callback){
		$.JMSClient('u/roles/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:role},callback);
	};
	//保存用户
	$.saveUser2=function(user,jmstoken,callback){
		// $.JMSClient('user/save',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:user},callback);
		$.JMSClient('user/updateInfo',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:user},callback);
	};
	//编辑用户
	$.saveUser1=function(user,jmstoken,callback){
		$.JMSClient('user/save',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:user},callback);
	};
	//管理员保存用户密码
	$.saveUserPassword=function(userPassword,jmstoken,callback){
		$.JMSClient('user/updateUserPasswordByAdmin',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:userPassword},callback);
	};
	//显示用户
	$.userInfo = function(userId,jmstoken,callback){
		$.JMSClient('u/getUserByUserId',{headers:{'JMS-TOKEN':jmstoken},data:{userId:userId}},callback);
	};
	//显示用户可选角色
	$.userRoleInfo = function(jmstoken,callback){
		$.JMSClient('u/wsRoles',{headers:{'JMS-TOKEN':jmstoken}},callback);
	};
	//给用户添加角色
	$.addRole=function(wsUserRoles,jmstoken,callback){
		$.JMSClient('u/addRoles',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:wsUserRoles},callback);
	};
	//给角色添加权限
	$.addPermission=function(wsRolePermissions,jmstoken,callback){
		$.JMSClient('u/rolePermissions/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:wsRolePermissions},callback);
	};
	//显示用户所选权限
	$.roleInfo = function(roleId,jmstoken,callback){
		$.JMSClient('u/getWSMenuListByRoleId',{headers:{'JMS-TOKEN':jmstoken},data:{roleId:roleId}},callback);
	};
	//显示用户可选权限
	$.rolePermissionInfo = function(jmstoken,callback){
		$.JMSClient('u/getWSMenuList',{headers:{'JMS-TOKEN':jmstoken}},callback);
	};

/*
	//保存停机原因
	$.saveStopDes=function(stopDes,jmstoken,callback){
		$.JMSClient('u/roles/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:stopDes},callback);
	};
	//显示停机原因
	 $.stopDesInfo = function(idStopDes,jmstoken,callback){
	 	$.JMSClient('u/getWSMenuListByRoleId',{headers:{'JMS-TOKEN':jmstoken},data:{idStopDes:idStopDes}},callback);
	 };
	//删除停机原因
	$.deleteStopDes = function(idStopDes,jmstoken,callback){
		$.JMSClient('s/deleteCostCenter',{headers:{'JMS-TOKEN':jmstoken},data:{idStopDes:idStopDes}},callback);
	};*/

     //12.显示公司信息
     $.companyInfo = function(jmstoken,callback){
          $.JMSClient('company/view',{headers:{'JMS-TOKEN':jmstoken}},callback);
      };
	  //新增仓库
	  $.saveStk = function(stk,jmstoken,callback){
          $.JMSClient('s/saveStk',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:stk},callback);
      };
      //删除仓库
	  $.deleteStk = function(stkId,jmstoken,callback){
          $.JMSClient('s/deleteStk',{headers:{'JMS-TOKEN':jmstoken},data:{stkId:stkId}},callback);
      };
      //显示仓库
      $.stkInfo = function(stkId,jmstoken,callback){
          $.JMSClient('s/findStk',{headers:{'JMS-TOKEN':jmstoken},data:{stkId:stkId}},callback);
      };
      //新增货架
	  $.saveBin=function(bin,jmstoken,callback){
		  $.JMSClient('s/saveBin',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:bin},callback);
      };
      //删除货架
	  $.deleteBin = function(binId,jmstoken,callback){
          $.JMSClient('s/deleteBin',{headers:{'JMS-TOKEN':jmstoken},data:{binId:binId}},callback);
      };
      //显示货架
      $.binInfo = function(binId,jmstoken,callback){
          $.JMSClient('s/findBin',{headers:{'JMS-TOKEN':jmstoken},data:{binId:binId}},callback);
      };
	  //新增物料小类
	  $.saveMCate=function(category,jmstoken,callback){
		  $.JMSClient('s/saveMaterialCategory',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:category},callback);
      };
      //显示物料小类
      $.mCateInfo = function(materialCategoryId,jmstoken,callback){
          $.JMSClient('s/findMaterialCategory',{headers:{'JMS-TOKEN':jmstoken},data:{materialCategoryId:materialCategoryId}},callback);
      };
      //删除物料小类
	  $.deleteMCate = function(materialCategoryId,jmstoken,callback){
          $.JMSClient('s/deleteMaterialCategory',{headers:{'JMS-TOKEN':jmstoken},data:{materialCategoryId:materialCategoryId}},callback);
      };
	//新增物料仓库关系
	$.saveMatBin=function(matBin,jmstoken,callback){
		$.JMSClient('s/saveMaterialBin',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:matBin},callback);
	};
	//删除物料仓库关系
	$.deleteMatBin = function(matBin,jmstoken,callback){
		$.JMSClient('s/deleteMaterialBin',{headers:{'JMS-TOKEN':jmstoken},data:matBin},callback);
	};
	  //新增合作公司
	   $.saveCocompany=function(cocompany,jmstoken,callback){
		  $.JMSClient('s/saveCompanyCo',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:cocompany},callback);
      };
	  //显示合作公司信息
	   $.cocompanyInfo = function(companyCoId,jmstoken,callback){
          $.JMSClient('s/findCompanyCo',{headers:{'JMS-TOKEN':jmstoken},data:{companyCoId:companyCoId}},callback);
      };
      //删除合作公司信息
	  $.deleteCocompany = function(companyCoId,jmstoken,callback){
          $.JMSClient('s/deleteCompanyCo',{headers:{'JMS-TOKEN':jmstoken},data:{companyCoId:companyCoId}},callback);
      };
      //新增合作公司联系人
	  $.saveLinkman=function(linkman,jmstoken,callback){
		  $.JMSClient('s/saveLinkman',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:linkman},callback);
      };
	  //显示合作公司联系人信息
	   $.linkmanInfo = function(linkmanId,jmstoken,callback){
          $.JMSClient('s/findLinkman',{headers:{'JMS-TOKEN':jmstoken},data:{linkmanId:linkmanId}},callback);
      };
      //删除合作公司联系人信息
	  $.deleteLinkman = function(linkmanId,jmstoken,callback){
          $.JMSClient('s/deleteLinkman',{headers:{'JMS-TOKEN':jmstoken},data:{linkmanId:linkmanId}},callback);
      };
	  //新增物料 未实现
	  $.saveMaterial = function(material,jmstoken,callback){
          $.JMSClient('s/saveMaterial',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:material},callback);
      };
	  //显示物料信息
      $.materialInfo = function(materialId,jmstoken,callback){
          $.JMSClient('s/findMaterial',{headers:{'JMS-TOKEN':jmstoken},data:{materialId:materialId}},callback);
      };
      //删除物料信息
	  $.deleteMaterial = function(materialId,jmstoken,callback){
          $.JMSClient('s/deleteMaterial',{headers:{'JMS-TOKEN':jmstoken},data:{materialId:materialId}},callback);
      };
    //查找物料信息
    $.findMaterialsBySpoMaterialId = function(spoMaterialId,jmstoken,callback){
        $.JMSClient('s/findMaterialsBySpoMaterialId',{headers:{'JMS-TOKEN':jmstoken},data:{spoMaterialId:spoMaterialId}},callback);
    };

	  //新增采购订单
	  $.savePo=function(po,jmstoken,callback){
          /*@TODO 待调试中  上传文件数据，新增配置*/
		  $.JMSClient('s/saveSpo',{
              'type':'POST',
              headers:{'JMS-TOKEN':jmstoken},
                  data:po,
                  //contentType: false,
                  //processData: false,
                  cache: false
              }
              ,callback);
	  };
     $.savePoFile=function(po,jmstoken,callback){
        $.JMSClient('s/uploadSpoAttachment',{
                type:'POST',
                headers:{'JMS-TOKEN':jmstoken},
                data:po,
                cache: false,
                contentType: false,
                processData: false
            }
            ,callback);
    };

	  //显示采购订单
	   $.poInfo = function(spoId,jmstoken,callback){
          $.JMSClient('s/findSpo',{headers:{'JMS-TOKEN':jmstoken},data:{spoId:spoId}},callback);
      };
      //删除采购订单 未实现
	  $.deletePo = function(poId,jmstoken,callback){
          $.JMSClient('s/deletePo',{headers:{'JMS-TOKEN':jmstoken},data:{poId:poId}},callback);
      };
	//保存采购订单备注
	$.saveSpoRemark=function(WSSpoRemark,jmstoken,callback){
		$.JMSClient('s/saveSpoRemark',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:WSSpoRemark},callback);
	};
      //显示来料入库单
	  $.mtfInfo = function(smtfId,jmstoken,callback){
          $.JMSClient('s/findSmtf',{headers:{'JMS-TOKEN':jmstoken},data:{smtfId:smtfId}},callback);
      };
      //新增来料入库单
	  $.saveMtf=function(mtf,jmstoken,callback){
		  $.JMSClient('s/saveSmtf',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:mtf},callback);
	  };
	//显示计划发料列表
	$.mtfIssueInfo = function(data,jmstoken,callback){
		$.JMSClient('p/findWSPlannedMaterialSending',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};
	//显示库存信息
	// $.inventoryInfo = function(materialId,jmstoken,ciallback){
	// 	$.JMSClient('s/findInventoryDetails',{headers:{'JMS-TOKEN':jmstoken},data:{materialId:materialId}},callback);
	// };
	//保存检验状态
	$.saveMtfStatus=function(mtfstatus,jmstoken,callback){
		$.JMSClient('s/updateMtfStatus',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:mtfstatus},callback);
	};
	//显示帐号仓库
	$.mtfStkInfo = function(stkName,jmstoken,callback){
		$.JMSClient('s/findStkByStkName',{headers:{'JMS-TOKEN':jmstoken},data:{stkName:stkName}},callback);
	};
	//显示帐号货架
	$.mtfBinInfo = function(stkTypeId,binName,jmstoken,callback){
		$.JMSClient('s/getSystemBinByStkTypeIdAndBinName',{headers:{'JMS-TOKEN':jmstoken},data:{stkTypeId:stkTypeId,binName:binName}},callback);
	};
      //新增销售订单
      $.saveSo=function(so,jmstoken,callback){
          $.JMSClient('s/saveSo',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:so},callback);
      };
	//保存销售订单备注
	$.saveSsoRemark=function(WSSSoRemark,jmstoken,callback){
		$.JMSClient('s/saveSSoAutoRemark',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:WSSSoRemark},callback);
	};
      //显示销售订单信息
      $.soInfo = function(soId,jmstoken,callback){
          $.JMSClient('s/findSo',{headers:{'JMS-TOKEN':jmstoken},data:{soId:soId}},callback);
      };
	//显示销售订单物料信息
	$.soMatInfo = function(soId,jmstoken,callback){
		$.JMSClient('s/getMaterialBySoId',{headers:{'JMS-TOKEN':jmstoken},data:{soId:soId}},callback);
	};
	//根据销售订单显示来料入库具体信息
	$.soDoMatInfo = function(soId,jmstoken,callback){
		$.JMSClient('s/getMaterialDeliveredBySoId',{headers:{'JMS-TOKEN':jmstoken},data:{soId:soId}},callback);
	};
	  //根据采购订单显示出库具体信息
		$.poIncomeMatInfo = function(spoId,stkId,jmstoken,callback){
		$.JMSClient('s/findWSSMtfMaterialBySpoIdAndStkId',{headers:{'JMS-TOKEN':jmstoken},data:{'spoId':spoId, 'stkId': stkId}},callback);
	};

    //保存工作中心
    $.saveWorkcenter=function(workcenter,jmstoken,callback){
        $.JMSClient('p/saveWorkCenter',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:workcenter},callback)
    };
    //保存往来公司
    $.saveCompanyCompany=function(companyCompany,jmstoken,callback){
        $.JMSClient('s/saveComCom',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:companyCompany},callback)
    };
	//修改往来状态
	$.changeCompanyCompanyStatus=function(data,jmstoken,callback) {
		$.JMSClient('s/updateWSComComStatus',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback)
	};
    //显示工作中心
    $.workcenterInfo = function(workCenterId,jmstoken,callback){
        $.JMSClient('p/findWorkCenter',{headers:{'JMS-TOKEN':jmstoken},data:{workCenterId:workCenterId}},callback);
    };
    //删除工作中心
    $.deleteWorkcenter = function(workCenterId,jmstoken,callback){
        $.JMSClient('p/deleteWorkCenter',{headers:{'JMS-TOKEN':jmstoken},data:{workCenterId:workCenterId}},callback);
    };
	//保存车间
	$.saveWip=function(wip,jmstoken,callback){
		$.JMSClient('p/saveWip',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:wip},callback)
	};
	//显示车间
	$.wipInfo = function(wipId,jmstoken,callback){
		$.JMSClient('p/findWip',{headers:{'JMS-TOKEN':jmstoken},data:{wipId:wipId}},callback);
	};
	//删除车间
	$.deleteWip = function(wipId,jmstoken,callback){
		$.JMSClient('p/deleteWip',{headers:{'JMS-TOKEN':jmstoken},data:{wipId:wipId}},callback);
	};
	//保存设备组
	$.saveMachineGroup=function(machineGroup,jmstoken,callback){
		$.JMSClient('m/saveMachineGroup',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:machineGroup},callback)
	};
	//显示设备组
	$.machineGroupInfo = function(idMachineGroup,jmstoken,callback){
		$.JMSClient('m/findWSMachineGroup',{headers:{'JMS-TOKEN':jmstoken},data:{idMachineGroup:idMachineGroup}},callback);
	};
	//删除设备组
	$.deleteMachineGroup = function(idMachineGroup,jmstoken,callback){
		$.JMSClient('m/deleteMachineGroup',{headers:{'JMS-TOKEN':jmstoken},data:{idMachineGroup:idMachineGroup}},callback);
	};
	//保存工单
	$.saveWo=function(wo,jmstoken,callback){
		$.JMSClient('p/saveWo',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:wo},callback)
	};
	//显示工单
	$.woInfo = function(woId,jmstoken,callback){
		$.JMSClient('p/findWo',{headers:{'JMS-TOKEN':jmstoken},data:{woId:woId}},callback);
	};
	//删除工单
	$.deleteWo = function(woId,jmstoken,callback){
		$.JMSClient('p/deleteWo',{headers:{'JMS-TOKEN':jmstoken},data:{woId:woId}},callback);
	};
	//结束工单
	$.closeWo=function(woId,jmstoken,callback){
		$.JMSClient('p/finishWo',{headers:{'JMS-TOKEN':jmstoken},data:{woId:woId}},callback)
	};
	//新增物料清单
	$.saveBom=function(bom,jmstoken,callback){
		$.JMSClient('p/saveBom',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:bom},callback);
	};
	//编辑物料清单
	$.updateBom=function(bom,jmstoken,callback){
		$.JMSClient('p/updateBomStatus',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:bom},callback);
	};
	//显示物料清单
	$.bomInfo = function(bomLabelId,jmstoken,callback){
		$.JMSClient('p/findBom',{headers:{'JMS-TOKEN':jmstoken},data:{bomLabelId:bomLabelId}},callback);
	};
	//删除物料清单
	$.deleteBom = function(bomLabelId,jmstoken,callback){
		$.JMSClient('p/deleteBom',{headers:{'JMS-TOKEN':jmstoken},data:{bomLabelId:bomLabelId}},callback);
	};
	//保存物料清单子
	$.saveBomD=function(bomD,jmstoken,callback){
		$.JMSClient('p/updateBomItem',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:bomD},callback);
	};
	//显示物料清单子
	$.bomDInfo = function(bomId,jmstoken,callback){
		$.JMSClient('p/findBomItem',{headers:{'JMS-TOKEN':jmstoken},data:{bomId:bomId}},callback);
	};
	//新增产线
	$.saveLine=function(pline,jmstoken,callback){
		$.JMSClient('p/saveWSPLine',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:pline},callback);
	};
	//显示产线
	$.lineInfo = function(lineId,jmstoken,callback){
		$.JMSClient('p/findWSPLine',{headers:{'JMS-TOKEN':jmstoken},data:{lineId:lineId}},callback);
	};
	//删除产线
	$.deleteLine = function(lineId,jmstoken,callback){
		$.JMSClient('p/deleteWSPLine',{headers:{'JMS-TOKEN':jmstoken},data:{lineId:lineId}},callback);
	};
	//保存停工编码
	$.saveStopsCode=function(stopsCode,jmstoken,callback){
		$.JMSClient('p/savePStopsCode',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:stopsCode},callback)
	};
	//显示停工编码
	$.stopsCodeInfo = function(idStopsCode,jmstoken,callback){
		$.JMSClient('p/findPStopsCode',{headers:{'JMS-TOKEN':jmstoken},data:{idStopsCode:idStopsCode}},callback);
	};
	//删除停工编码
	$.deleteStopsCode = function(idStopsCode,jmstoken,callback){
		$.JMSClient('p/deletePStopsCode',{headers:{'JMS-TOKEN':jmstoken},data:{idStopsCode:idStopsCode}},callback);
	};
	//保存生产排班
	$.saveShiftPlan=function(shiftPlan,jmstoken,callback){
		$.JMSClient('p/saveShiftPlan',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:shiftPlan},callback)
	};
	//显示生产排班
	$.shiftPlanInfo = function(idShiftPlan,jmstoken,callback){
		$.JMSClient('p/findShiftPlan',{headers:{'JMS-TOKEN':jmstoken},data:{idShiftPlan:idShiftPlan}},callback);
	};
	//删除生产排班  未实现
	$.deleteShiftPlan = function(idShiftPlan,jmstoken,callback){
		$.JMSClient('p/deleteShiftPlan',{headers:{'JMS-TOKEN':jmstoken},data:{idShiftPlan:idShiftPlan}},callback);
	};
	//根据工单显示相关信息
	$.cppWoInfo = function(woId,jmstoken,callback){
		$.JMSClient('p/findWSMaterialQtyByWoId',{headers:{'JMS-TOKEN':jmstoken},data:{woId:woId}},callback);
	};
    //保存检查设置 未实现
    $.saveCheckSet=function(checkSet,jmstoken,callback){
        $.JMSClient('p/saveCheckTime',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:checkSet},callback)
    };
    //显示检查设置  未实现
    $.checkSetInfo = function(checkTimeId,jmstoken,callback){
        $.JMSClient('p/findCheckTime',{headers:{'JMS-TOKEN':jmstoken},data:{checkTimeId:checkTimeId}},callback);
    };
    //删除检查设置  未实现
    $.deleteCheckSet = function(checkTimeId,jmstoken,callback){
        $.JMSClient('p/deleteCheckTime',{headers:{'JMS-TOKEN':jmstoken},data:{checkTimeId:checkTimeId}},callback);
    };
	//显示roller-OEE报表
	$.oeeInfo = function(data,jmstoken,callback){
		$.JMSClient('p/findWSOEE',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};
	//显示pulley-OEE报表
	$.oeePulleyInfo = function(data,jmstoken,callback){
		$.JMSClient('p/findLongWSOEE',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};

	//保存停工计划
	$.saveStopPlan=function(stopPlan,jmstoken,callback){
		$.JMSClient('p/savePStopsPlan',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:stopPlan},callback)
	};
	//显示停工计划
	$.stopPlanInfo = function(idStopsPlan,jmstoken,callback){
		$.JMSClient('p/findPStopsPlan',{headers:{'JMS-TOKEN':jmstoken},data:{idStopsPlan:idStopsPlan}},callback);
	};
	//删除停工计划
	$.deleteStopPlan = function(idStopsPlan,jmstoken,callback){
		$.JMSClient('p/deletePStopsPlan',{headers:{'JMS-TOKEN':jmstoken},data:{idStopsPlan:idStopsPlan}},callback);
	};


	//保存工作日历
	$.saveCalendar=function(calendar,jmstoken,callback){
		$.JMSClient('o/saveWSOCalendar',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:calendar},callback)
	};
	//显示工作日历
	$.calendarInfo = function(idCalendar,jmstoken,callback){
		$.JMSClient('o/findWSOCalendar',{headers:{'JMS-TOKEN':jmstoken},data:{idCalendar:idCalendar}},callback);
	};
	//删除工作日历
	$.deleteCalendar = function(idCalendar,jmstoken,callback){
		$.JMSClient('o/deleteWSOCalendar',{headers:{'JMS-TOKEN':jmstoken},data:{idCalendar:idCalendar}},callback);
	};


	//保存加班计划
	$.saveOvertime=function(overtime,jmstoken,callback){
		$.JMSClient('o/saveWSOOvertime',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:overtime},callback)
	};
	//显示加班计划
	$.overtimeInfo = function(idOvertime,jmstoken,callback){
		$.JMSClient('o/findWSOOvertime',{headers:{'JMS-TOKEN':jmstoken},data:{idOvertime:idOvertime}},callback);
	};
	//删除加班计划
	$.deleteOvertime = function(idOvertime,jmstoken,callback){
		$.JMSClient('o/deleteWSOOvertime',{headers:{'JMS-TOKEN':jmstoken},data:{idOvertime:idOvertime}},callback);
	};

	//保存实际装载
	$.saveActSetup=function(actStop,jmstoken,callback){
		$.JMSClient('p/saveWSPActualSetup',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:actStop},callback)
	};
	//显示实际装载
	$.actSetupInfo = function(actSetupId,jmstoken,callback){
		$.JMSClient('p/findWSPActualSetupById',{headers:{'JMS-TOKEN':jmstoken},data:{actSetupId:actSetupId}},callback);
	};
	//显示实际停工
	$.actStopInfo = function(idActStop,jmstoken,callback){
		$.JMSClient('p/findPStopsPlan',{headers:{'JMS-TOKEN':jmstoken},data:{idStopsPlan:idActStop}},callback);
	};
	//保存非计划停工
	$.saveUnplannedStop=function(unplannedStop,jmstoken,callback){
		$.JMSClient('p/saveWSPUnplannedStops',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:unplannedStop},callback)
	};
	//显示非计划停工
	$.unplannedStopInfo = function(idUnplannedStop,jmstoken,callback){
		$.JMSClient('p/findWSUnPlannedStop',{headers:{'JMS-TOKEN':jmstoken},data:{idUnplannedStops:idUnplannedStop}},callback);
	};


	//新增工艺路线
	$.saveRoutine=function(routine,jmstoken,callback){
		$.JMSClient('p/saveRoutine',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:routine},callback);
	};
	//编辑工艺路线
	$.updateRoutine=function(routine,jmstoken,callback){
		$.JMSClient('p/updateWSPRoutineInfo',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:routine},callback);
	};
	//显示工艺路线
	$.routineInfo = function(idPRoutine,jmstoken,callback){
		$.JMSClient('p/findPRoutine',{headers:{'JMS-TOKEN':jmstoken},data:{idPRoutine:idPRoutine}},callback);
	};
	//删除工艺路线
	$.deleteRoutine = function(idPRoutine,jmstoken,callback){
		$.JMSClient('p/deletePRoutine',{headers:{'JMS-TOKEN':jmstoken},data:{idPRoutine:idPRoutine}},callback);
	};
	//保存工序子
	$.saveRoutineD=function(routineD,jmstoken,callback){
		$.JMSClient('p/savePRoutineD',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:routineD},callback);
	};
	//显示工序子
	$.routineDInfo = function(idPRoutineD,jmstoken,callback){
		$.JMSClient('p/findPRoutineD',{headers:{'JMS-TOKEN':jmstoken},data:{idPRoutineD:idPRoutineD}},callback);
	};
	//删除工序子
	$.deleteRoutineD = function(idRoutineD,jmstoken,callback){
		$.JMSClient('p/deletePRoutineD',{headers:{'JMS-TOKEN':jmstoken},data:{idRoutineD:idRoutineD}},callback);
	};
	//获取工艺路线的附件列表
	$.getEnclosureList = function(routineDId,jsmtoken,callback){
		$.JMSClient('p/getRoutineDAtts',{headers:{'JMS-TOKEN':jmstoken},data:{routineDId:routineDId}},callback);
	}
	//删除工艺路线附件
	$.deleteRoutineDFil = function(fileId,jmstoken,callback){
		$.JMSClient('p/deleteRoutineDAttById',{headers:{'JMS-TOKEN':jmstoken},data:{fileId:fileId}},callback);
	};
	//保存工艺检查列表
	$.saveCheckList=function(checkList,jmstoken,callback){
		$.JMSClient('q/saveCheckList',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:checkList},callback)
	};
	//显示工艺检查列表
	$.checkInfo = function(checkListId,jmstoken,callback){
		$.JMSClient('q/findCheckList',{headers:{'JMS-TOKEN':jmstoken},data:{checkListId:checkListId}},callback);
	};
	//删除工艺检查列表
	$.deleteCheck = function(checkListId,jmstoken,callback){
		$.JMSClient('q/deleteCheckList',{headers:{'JMS-TOKEN':jmstoken},data:{checkListId:checkListId}},callback);
	};

	//新增标准工艺路线
	$.saveStdRoutine=function(routineStd,jmstoken,callback){
		$.JMSClient('p/savePStandardRoutineD',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:routineStd},callback);
	};
	//显示标准工艺路线
	$.stdRoutineInfo = function(idStandardRoutined,jmstoken,callback){
		$.JMSClient('p/findPStandardRoutineD',{headers:{'JMS-TOKEN':jmstoken},data:{idStandardRoutined:idStandardRoutined}},callback);
	};
	//删除标准工艺路线
	$.deleteStdRoutine = function(idStandardRoutined,jmstoken,callback){
		$.JMSClient('p/deletePStandardRoutineD',{headers:{'JMS-TOKEN':jmstoken},data:{idStandardRoutined:idStandardRoutined}},callback);
	};

	//保存日生产计划
	$.saveCpp=function(cpp,jmstoken,callback){
		$.JMSClient('p/saveWSPCpp',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:cpp},callback)
	};
	//显示日生产计划
	$.cppInfo = function(cppId,jmstoken,callback){
		$.JMSClient('p/findCpp',{headers:{'JMS-TOKEN':jmstoken},data:{cppId:cppId}},callback);
	};
	//保存日生产检查计划
	$.saveCppCheck=function(cpp,jmstoken,callback){
		$.JMSClient('p/saveCheckPlan',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:cpp},callback)
	};
	//显示日生产检查计划
	$.cppCheckInfo = function(cppId,jmstoken,callback){
		$.JMSClient('p/findCheckPlans',{headers:{'JMS-TOKEN':jmstoken},data:{cppId:cppId}},callback);
	};
	//删除日生产计划 未实现
	$.deleteCpp = function(cppId,jmstoken,callback){
		$.JMSClient('p/deleteWSCpp',{headers:{'JMS-TOKEN':jmstoken},data:{cppId:cppId}},callback);
	};
	//保存机台信息 未实现
	$.saveMachine=function(machine,jmstoken,callback){
		$.JMSClient('m/saveMachine',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:machine},callback);
	};
	//显示机台信息
	$.machineInfo = function(machineId,jmstoken,callback){
		$.JMSClient('m/findMachine',{headers:{'JMS-TOKEN':jmstoken},data:{machineId:machineId}},callback);
	};
	//删除机台信息
	$.deleteMachine = function(machineId,jmstoken,callback){
		$.JMSClient('m/deleteMachine',{headers:{'JMS-TOKEN':jmstoken},data:{idMachine:machineId}},callback);
	};
	//保存设备备件
	$.saveSparePart=function(sparePart,jmstoken,callback){
		$.JMSClient('m/saveSparePart',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:sparePart},callback);
	};
	//显示设备备件
	$.sparePartInfo = function(sparePartId,jmstoken,callback){
		$.JMSClient('m/findSparePart',{headers:{'JMS-TOKEN':jmstoken},data:{idPart:sparePartId}},callback);
	};
	//删除设备备件
	$.deleteSparePart = function(sparePartId,jmstoken,callback){
		$.JMSClient('m/deleteSparePart',{headers:{'JMS-TOKEN':jmstoken},data:{idPart:sparePartId}},callback);
	};
	//显示维修历史
	$.historyInfo = function(idRepairHistory,jmstoken,callback){
		$.JMSClient('m/findRepairHistory',{headers:{'JMS-TOKEN':jmstoken},data:{idRepairHistory:idRepairHistory}},callback);
	};
	//保存维修历史
	$.saveHistory = function(history,jmstoken,callback){
		$.JMSClient('m/saveRepairHistory',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:history},callback);
	};
	//删除维修历史 ?
	$.deleteHistory = function(idRepairHistory,jmstoken,callback){
		$.JMSClient('m/deleteRepairHistory',{headers:{'JMS-TOKEN':jmstoken},data:{idRepairHistory:idRepairHistory}},callback);
	};
	//保存保养计划  未实现
	$.saveMainPlan=function(mainPlan,jmstoken,callback){
		$.JMSClient('m/saveMainItem',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:mainPlan},callback);
	};
	//显示保养计划 未实现
	$.mainPlanInfo = function(idMainItem,jmstoken,callback){
		$.JMSClient('m/findMainItem',{headers:{'JMS-TOKEN':jmstoken},data:{idMainItem:idMainItem}},callback);
	};
	//删除保养计划  未实现
	$.deleteMainPlan = function(idMainItem,jmstoken,callback){
		$.JMSClient('m/deleteMainItem',{headers:{'JMS-TOKEN':jmstoken},data:{idMainItem:idMainItem}},callback);
	};

	//保存保养记录
	$.saveMain=function(main,jmstoken,callback){
		$.JMSClient('m/saveWSMainRecords',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:main},callback);
	};
	//显示保养记录
	$.mainInfo = function(idMainRecord,jmstoken,callback){
		$.JMSClient('m/getMainRecordById',{headers:{'JMS-TOKEN':jmstoken},data:{idMainRecord:idMainRecord}},callback);
	};

	//显示设备故障率
	$.mbrInfo = function(data,jmstoken,callback){
		$.JMSClient('m/getWSBreakdownRate',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};
	//显示mttr和mtbf
	$.mtbfMttrInfo = function(data,jmstoken,callback){
		$.JMSClient('m/getWSMtbf',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};
	//显示日常保养计划
	$.dailyMainInfo = function(data,jmstoken,callback){
		$.JMSClient('m/getMantenceDaily',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};
	//显示预防保养计划
	$.preMainInfo = function(data,jmstoken,callback){
		$.JMSClient('m/getMantence',{headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	};


	//显示质量文件
	$.qmInfo = function(fileId,jmstoken,callback){
		$.JMSClient('q/findQFileManagement',{headers:{'JMS-TOKEN':jmstoken},data:{fileId:fileId}},callback);
	};
	//新增质量文件
	$.saveQm=function(qm,jmstoken,callback){
		$.JMSClient('q/saveQFileManagement',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:qm},callback);
	};
	//删除质量文件
	$.deleteQm = function(fileId,jmstoken,callback){
		$.JMSClient('q/deleteQFileManagement',{headers:{'JMS-TOKEN':jmstoken},data:{fileId:fileId}},callback);
	};

	//显示文件模板列表
	$.temList = function(jmstoken,callback){
		$.JMSClient('q/getQFileTemplateList',{headers:{'JMS-TOKEN':jmstoken}},callback);
	};



	//显示不合格处理单
	$.noProcessingInfo = function(qNoProcessId,jmstoken,callback){
		$.JMSClient('q/findQNoProcess',{headers:{'JMS-TOKEN':jmstoken},data:{qNoProcessId:qNoProcessId}},callback);
	};
	//新增不合格处理单
	$.saveNoProcessing=function(noProcessing,jmstoken,callback){
		$.JMSClient('q/saveQNoProcess',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:noProcessing},callback);
	};
	//删除不合格处理单
	$.deleteNoProcessing = function(qNoProcessId,jmstoken,callback){
		$.JMSClient('q/deleteQNoProcess',{headers:{'JMS-TOKEN':jmstoken},data:{qNoProcessId:qNoProcessId}},callback);
	};
	//显示ncr
	$.ncrInfo = function(qNcr2Id,jmstoken,callback){
		$.JMSClient('q/findQNcr2',{headers:{'JMS-TOKEN':jmstoken},data:{qNcr2Id:qNcr2Id}},callback);
	};
	//新增ncr
	$.saveNcr=function(ncr,jmstoken,callback){
		$.JMSClient('q/saveQNcr2',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:ncr},callback);
	};
	//删除ncr
	$.deleteNcr = function(qNcr2Id,jmstoken,callback){
		$.JMSClient('q/deleteQNcr2',{headers:{'JMS-TOKEN':jmstoken},data:{qNcr2Id:qNcr2Id}},callback);
	};
	//显示偏差申请
	$.deviationInfo = function(qDeviationId,jmstoken,callback){
		$.JMSClient('q/findQDeviation',{headers:{'JMS-TOKEN':jmstoken},data:{qDeviationId:qDeviationId}},callback);
	};
	//新增偏差申请
	$.saveDeviation=function(deviation,jmstoken,callback){
		$.JMSClient('q/saveQDeviation',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:deviation},callback);
	};
	//删除偏差申请
	$.deleteDeviation = function(qDeviationId,jmstoken,callback){
		$.JMSClient('q/deleteQDeviation',{headers:{'JMS-TOKEN':jmstoken},data:{qDeviationId:qDeviationId}},callback);
	};
	//显示偏差申请
	$.carInfo = function(qCarId,jmstoken,callback){
		$.JMSClient('q/findQCar',{headers:{'JMS-TOKEN':jmstoken},data:{qCarId:qCarId}},callback);
	};
	//新增偏差申请
	$.saveCar=function(car,jmstoken,callback){
		$.JMSClient('q/saveQCar',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:car},callback);
	};
	//删除偏差申请
	$.deleteCar = function(qCarId,jmstoken,callback){
		$.JMSClient('q/deleteQCar',{headers:{'JMS-TOKEN':jmstoken},data:{qCarId:qCarId}},callback);
	};
	//显示8D
	$.eightDInfo = function(qDG8dId,jmstoken,callback){
		$.JMSClient('q/findQG8d',{headers:{'JMS-TOKEN':jmstoken},data:{qDG8dId:qDG8dId}},callback);
	};
	//新增8D
	$.saveEightD=function(eightD,jmstoken,callback){
		$.JMSClient('q/saveQG8d',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:eightD},callback);
	};
	//删除8D
	$.deleteEightD = function(qDG8dId,jmstoken,callback){
		$.JMSClient('q/deleteQG8d',{headers:{'JMS-TOKEN':jmstoken},data:{qDG8dId:qDG8dId}},callback);
	};


	//显示ehs记录
	$.ehsRecordInfo = function(idEhsRecord,jmstoken,callback){
		$.JMSClient('e/findWSEHSRecord',{headers:{'JMS-TOKEN':jmstoken},data:{idEhsRecord:idEhsRecord}},callback);
	};
	//新增ehs记录
	$.saveEhsRecord=function(ehsRecord,jmstoken,callback){
		$.JMSClient('e/saveWSEHSRecord',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:ehsRecord},callback);
	};
	//删除ehs记录
	$.deleteEhsRecord = function(idEhsRecord,jmstoken,callback){
		$.JMSClient('e/deleteWSEHSRecord',{headers:{'JMS-TOKEN':jmstoken},data:{idEhsRecord:idEhsRecord}},callback);
	};

	//显示ehs项目
	$.ehsItemInfo = function(idEhs,jmstoken,callback){
		$.JMSClient('e/findWSEHSItem',{headers:{'JMS-TOKEN':jmstoken},data:{idEhs:idEhs}},callback);
	};
	//新增ehs项目
	$.saveEhsItem=function(ehsItem,jmstoken,callback){
		$.JMSClient('e/saveWSEHSItem',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:ehsItem},callback);
	};
	//删除ehs项目
	$.deleteEhsItem = function(idEhs,jmstoken,callback){
		$.JMSClient('e/deleteWSEHSItem',{headers:{'JMS-TOKEN':jmstoken},data:{idEhs:idEhs}},callback);
	};


	//显示pulley列表
	$.pulleylcdshowTable = function(companyId,delay,callback){
		$.JMSClient('check/findWSPwoStatus',{data:{companyId:companyId,delay:delay}},callback);
	};

/*

    //删除保养记录  未实现
	  $.deleteMain = function(mainId,jmstoken,callback){
      $.JMSClient('s/deleteMain',{headers:{'JMS-TOKEN':jmstoken},data:{mainId:mainId}},callback);
    };



	  //显示员工EHS信息 未实现
	   $.ehsInfo = function(ehs,jmstoken,callback){
          $.JMSClient('s/ehs/view',{headers:{'JMS-TOKEN':jmstoken},data:ehs},callback);
      };
      //新增员工EHS 未实现
	  $.createEmployeeEhs=function(employeeEhs,jmstoken,callback){
		  $.JMSClient('s/employeeEhs/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:employeeEhs},callback);
	  };
	  //显示EHS表格 未实现
//	   $.ehsInfo = function(ehs,jmstoken,callback){
//        $.JMSClient('s/ehs/view',{headers:{'JMS-TOKEN':jmstoken},data:ehs},callback);
//    };
      //新增员工EHS 未实现
//	  $.createEhs=function(ehs,jmstoken,callback){
//		  $.JMSClient('s/ehs/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:ehs},callback);
//	  };

	  //显示首件检查清单 未实现
	   $.faiInfo = function(fai,jmstoken,callback){
          $.JMSClient('s/fai/view',{headers:{'JMS-TOKEN':jmstoken},data:fai},callback);
      };
      //新增首件检查清单 未实现
	  $.createFai=function(fai,jmstoken,callback){
		  $.JMSClient('s/fai/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:fai},callback);
	  };
	  //显示过程检查清单 未实现
	   $.inProcessingInfo = function(inProcessing,jmstoken,callback){
          $.JMSClient('s/inProcessing/view',{headers:{'JMS-TOKEN':jmstoken},data:inProcessing},callback);
      };
      //新增过程检查清单 未实现
	  $.createInProcessing=function(inProcessing,jmstoken,callback){
		  $.JMSClient('s/inProcessing/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:inProcessing},callback);
	  };
	  //显示尺寸报告 未实现
	   $.dimensionReportInfo = function(dimensionReport,jmstoken,callback){
          $.JMSClient('s/dimensionReport/view',{headers:{'JMS-TOKEN':jmstoken},data:dimensionReport},callback);
      };
      //新增尺寸报告 未实现
	  $.createDimensionReport=function(dimensionReport,jmstoken,callback){
		  $.JMSClient('s/dimensionReport/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:dimensionReport},callback);
	  };
	  //显示最终审核清单 未实现
	   $.finalAuditInfo = function(finalAudit,jmstoken,callback){
          $.JMSClient('s/finalAuditReport/view',{headers:{'JMS-TOKEN':jmstoken},data:finalAudit},callback);
      };
      //新增最终审核清单 未实现
	  $.createFinalAudit=function(finalAudit,jmstoken,callback){
		  $.JMSClient('s/finalAudit/create',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:finalAudit},callback);
	  };
*/

	   //显示testing
	   $.testInfo = function(jmstoken,callback){
          $.JMSClient('s/testing1',{headers:{'JMS-TOKEN':jmstoken}},callback);
      };
      //保存testing
      	  $.saveTesting=function(testing,jmstoken,callback){
		  $.JMSClient('s/testing1',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:testing},callback);
	  };

	//to be moved to another js file.
	//$.urlParam = function(name){
	//var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	//return results[1] || 0;
//}
	$.signsubmit=function(data,jmstoken,callback){
		$.JMSClient('sys/sign/saveSignEvent',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.getStepBtns=function(data,jmstoken,callback){
		$.JMSClient('project/getProjectStepStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projId:data}},callback);
	}
	$.finishStep=function(data,jmstoken,callback){
		$.JMSClient('project/finishProjectStep?proStepId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.getUserJob=function(data,jmstoken,callback){
		$.JMSClient('sys/user/userRoles',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.saveUserRoles=function(data,jmstoken,callback){
		$.JMSClient('sys/user/saveUserRoles',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.customerTable=function(data,jmstoken,callback){
		$.JMSClient('project/customerTable',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.openAccount=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/openAccount?projId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.disabledUsersAccount=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/disabledUsersAccount?projId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.updateUsersPassword=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/updateUsersPasswordByProjectId',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
})(jQuery, window, document);
