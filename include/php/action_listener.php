<?php
require_once 'event_message.php';
interface action_listener{
    public function actionPerformed(event_message $em);
}
?>
