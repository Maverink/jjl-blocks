<?php

defined('ABSPATH') || exit;

add_action('enqueue_block_editor_assets', 'jjl_gallery_block_enqueue_editor_assets');

function jjl_gallery_block_enqueue_editor_assets(){

    wp_enqueue_script(
        'jjl_gallery_block_enqueue_editor_assets_js',
        plugins_url('block.build.js' , __FILE__),
        array('wp-blocks','wp-i18n','wp-editor' ,'wp-components'),
        filemtime( plugin_dir_path(__FILE__) . 'block.build.js')
        
    );

    wp_enqueue_style(
        'jjl_gallery_block_enqueue_editor_assets_css',
        plugins_url('editor.css',__FILE__),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'editor.css')

    );

}

add_action('enqueue_block_assets','jjl_gallery_block_enqueue_front_assets');

function jjl_gallery_block_enqueue_front_assets(){
    wp_enqueue_style(
        'jjl_gallery_block_enqueue_front_assets_css',
        plugins_url('style.css', __FILE__),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'style.css')
    );
    }


?>