<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/case/php_action/case_model.php';

    class do_select_search_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $selectBuildingId = $_POST['selectBuilding'];
            $selectUser = $_POST['selectUser'];
            $selectRepairTypeId = $_POST['selectRepairType'];
            $selectDate = $_POST['selectDate'];
            
            $data=[];
            $a=[];
            $b=[];
            $ab=[];
            $selectData=[];
            
            $houseHold = new household_model();
            $building = new building_model();
            $user = new user_profile_model();
            $case = new case_model();
            
            if($selectBuildingId != null && $selectUser != null && $selectRepairTypeId != null && $selectDate != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                $publicFacilitiesAll = $houseHold->get_something_from_public_facilities('id','construction_project_id = '.$selectBuildingId);
                if($houserHoldProfileAll){
                    foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($publicFacilitiesAll){
                    foreach($publicFacilitiesAll as $key => $publicFacilitiesOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','public_facilities_id = '.$publicFacilitiesOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($userAll){
                    foreach($userAll['data_set'] as $key => $userOne){
                          $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                          if($houserHoldUserAll){
                              foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                                  array_push($b,$houserHoldUserOne['id']);
                              }
                          }
                    }
                }
                foreach($a as $key => $aData){
                    $bData = array_search($aData,$b);
                    if($bData !== false){
                        array_push($ab,$b[$bData]);    
                    }
                }
                foreach($ab as $key => $abData){
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$abData.' AND repair_type_id = '.$selectRepairTypeId.' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                    array_push($data,$caseAll);
                } 
            }
            if($selectBuildingId == null && $selectUser == null && $selectRepairTypeId == null && $selectDate == null){
                $caseAll = $case->get_something_from_case_profile('*','1 ORDER BY id DESC');
                array_push($data,$caseAll);
            }
            else if($selectBuildingId != null && $selectUser != null && $selectRepairTypeId != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                $publicFacilitiesAll = $houseHold->get_something_from_public_facilities('id','construction_project_id = '.$selectBuildingId);
                if($houserHoldProfileAll){
                    foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($publicFacilitiesAll){
                    foreach($publicFacilitiesAll as $key => $publicFacilitiesOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','public_facilities_id = '.$publicFacilitiesOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($userAll){
                    foreach($userAll['data_set'] as $key => $userOne){
                          $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                          if($houserHoldUserAll){
                              foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                                  array_push($b,$houserHoldUserOne['id']);
                              }
                          }
                    }
                }
                foreach($a as $key => $aData){
                    $bData = array_search($aData,$b);
                    if($bData !== false){
                        array_push($ab,$b[$bData]);    
                    }
                }
                foreach($ab as $key => $abData){
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$abData.' AND repair_type_id = '.$selectRepairTypeId.' ORDER BY id DESC');
                    array_push($data,$caseAll);
                }  
            }
            else if($selectBuildingId != null && $selectUser != null && $selectDate != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                $publicFacilitiesAll = $houseHold->get_something_from_public_facilities('id','construction_project_id = '.$selectBuildingId);
                if($houserHoldProfileAll){
                    foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($publicFacilitiesAll){
                    foreach($publicFacilitiesAll as $key => $publicFacilitiesOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','public_facilities_id = '.$publicFacilitiesOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($userAll){
                    foreach($userAll['data_set'] as $key => $userOne){
                          $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                          if($houserHoldUserAll){
                              foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                                  array_push($b,$houserHoldUserOne['id']);
                              }
                          }
                    }
                }
                foreach($a as $key => $aData){
                    $bData = array_search($aData,$b);
                    if($bData !== false){
                        array_push($ab,$b[$bData]);    
                    }
                }
                foreach($ab as $key => $abData){
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$abData.' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                    array_push($data,$caseAll);
                }
            }
            else if($selectBuildingId != null && $selectRepairTypeId != null && $selectDate != null){
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                    $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne[0]['id'].' AND repair_type_id = '.$selectRepairTypeId.' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                    array_push($data,$caseAll);
                }    
            }
            else if($selectUser != null && $selectRepairTypeId != null && $selectDate != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                foreach($userAll['data_set'] as $key => $userOne){
                    $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                    if($houserHoldUserAll){
                        foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                            $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne['id'].' AND repair_type_id = '.$selectRepairTypeId.' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                            array_push($data,$caseAll);
                        }
                    }
                } 
            }
            else if($selectBuildingId != null && $selectUser != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                $publicFacilitiesAll = $houseHold->get_something_from_public_facilities('id','construction_project_id = '.$selectBuildingId);
                if($houserHoldProfileAll){
                    foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($publicFacilitiesAll){
                    foreach($publicFacilitiesAll as $key => $publicFacilitiesOne){
                        $houserHoldUserOne = $houseHold->get_something_from_household_user('id','public_facilities_id = '.$publicFacilitiesOne['id']);
                        array_push($a,$houserHoldUserOne[0]['id']);
                    }
                }
                if($userAll){
                    foreach($userAll['data_set'] as $key => $userOne){
                          $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                          if($houserHoldUserAll){
                              foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                                  array_push($b,$houserHoldUserOne['id']);
                              }
                          }
                    }
                }
                foreach($a as $key => $aData){
                    $bData = array_search($aData,$b);
                    if($bData !== false){
                        array_push($ab,$b[$bData]);    
                    }
                }
                foreach($ab as $key => $abData){
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$abData.' ORDER BY id DESC');
                    array_push($data,$caseAll);
                }
            }
            else if($selectBuildingId != null && $selectRepairTypeId != null){
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                    $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne[0]['id'].' AND repair_type_id = '.$selectRepairTypeId.' ORDER BY id DESC');
                    array_push($data,$caseAll);
                }
            }
            else if($selectBuildingId != null && $selectDate != null){
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                    $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne[0]['id'].' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                    array_push($data,$caseAll);
                }  
            }
            else if($selectUser != null && $selectRepairTypeId != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                foreach($userAll['data_set'] as $key => $userOne){
                    $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                    if($houserHoldUserAll){
                        foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                            $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne['id'].' AND repair_type_id = '.$selectRepairTypeId.' ORDER BY id DESC');
                            array_push($data,$caseAll);
                        }
                    }
                }  
            }
            else if($selectUser != null && $selectDate != null){
                $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                foreach($userAll['data_set'] as $key => $userOne){
                    $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                    if($houserHoldUserAll){
                        foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                            $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne['id'].' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                            array_push($data,$caseAll);
                        }
                    }
                }      
            }
            else if($selectRepairTypeId != null && $selectDate != null){
                $caseAll = $case->get_something_from_case_profile('*','repair_type_id = '.$selectRepairTypeId.' AND start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                array_push($data,$caseAll);
            }
            else if($selectBuildingId != null){
                $houserHoldProfileAll =$houseHold->get_something_from_household_profile('id','construction_project_id = '.$selectBuildingId);
                foreach($houserHoldProfileAll as $key => $houserHoldProfileOne){
                    $houserHoldUserOne = $houseHold->get_something_from_household_user('id','houseHold_profile_id = '.$houserHoldProfileOne['id']);
                    $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne[0]['id'].' ORDER BY id DESC');
                    array_push($data,$caseAll);
                }  
            }
            else if($selectUser != null){
              $userAll =  $user->get_something_from_user_profile('id','name LIKE "'.$selectUser.'%"');
                foreach($userAll['data_set'] as $key => $userOne){
                    $houserHoldUserAll = $houseHold->get_something_from_household_user('id','user_profile_id = '.$userOne['id']);
                    if($houserHoldUserAll){
                        foreach($houserHoldUserAll as $key => $houserHoldUserOne){
                            $caseAll = $case->get_something_from_case_profile('*','household_user_id = '.$houserHoldUserOne['id'].' ORDER BY id DESC');
                            array_push($data,$caseAll);
                        }
                    }
                }
            }
            else if($selectRepairTypeId != null){
                $caseAll = $case->get_something_from_case_profile('*','repair_type_id = '.$selectRepairTypeId.' ORDER BY id DESC');
                array_push($data,$caseAll); 
            }
            else if($selectDate != null){
                $caseAll = $case->get_something_from_case_profile('*','start_datetime LIKE "'.$selectDate.'%" ORDER BY id DESC');
                array_push($data,$caseAll);
            }
            
            foreach($data as $key => $caseAll){
                if($caseAll){
                    foreach($caseAll as $key => $caseOne){
                        $repairType = $case->get_something_from_repair_type('*','id ='.$caseOne['repair_type_id']);
                        $houseHoldUserOne = $houseHold->get_something_from_household_user('*','id ='.$caseOne['household_user_id']);
                        $userOne = $user->get_something_from_user_profile('*','id ='.$houseHoldUserOne[0]['user_profile_id']);
                        if($userOne['data_set'][0]['type'] === 'user'){
                        $houseHoldProfileOne = $houseHold->get_something_from_household_profile('*','id ='.$houseHoldUserOne[0]['household_profile_id']);
                        $buildingOne = $building->get_something_from_construction_project('*',$houseHoldProfileOne[0]['construction_project_id']);
                        }else{
                        $publicFacilitiesOne = $houseHold->get_something_from_public_facilities('*','id ='.$houseHoldUserOne[0]['public_facilities_id']);
                        $buildingOne = $building->get_something_from_construction_project('*',$publicFacilitiesOne[0]['construction_project_id']);
                        }
                        $sum=['case' => $caseOne,'repairType' => $repairType,'houseHold' => ['houseHoldUser' => $houseHoldUserOne,'houseHoldProfile' => $houseHoldProfileOne,'publicFacilities' => $publicFacilitiesOne],'building' => $buildingOne,'user' => $userOne];
                        array_push($selectData,$sum );
                    }
                }
            }
            return json_encode($selectData);
        }
    }
?>