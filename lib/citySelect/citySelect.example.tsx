import React, { useState } from 'react';
import CitySelect from './citySelect';

const CitySelectExample: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const cityList = {
    a: ['安庆', '安顺', '安阳', '鞍山', '澳门'],
    b: ['巴彦淖尔', '巴中', '白城', '白山', '白银', '百色', '蚌埠', '包头', '宝鸡', '保定', '保山', '北海', '北京', '本溪', '毕节', '滨州', '博尔塔拉'],
    c: ['沧州', '长春', '长沙', '长治', '常德', '常州', '巢湖', '朝阳', '潮州', '郴州', '成都', '池州', '赤峰', '崇左', '滁州', '楚雄'],
    d: ['达州', '大理', '大连', '大庆', '大同', '大兴安岭', '德宏', '德州', '德阳', '迪庆', '东莞', '东营', '都匀'],
    e: ['鄂尔多斯', '鄂州', '恩施'],
    f: ['防城港', '佛山', '福州', '抚顺', '抚州', '阜新', '阜阳'],
    g: ['甘南', '赣州', '固原', '广安', '广元', '广州', '贵港', '贵阳', '桂林'],
    h: ['哈尔滨', '哈密', '海北', '海东', '海口', '海南', '海西', '邯郸', '汉中', '杭州', '合肥', '和田', '河池', '河源', '菏泽', '贺州', '鹤壁', '鹤岗', '黑河', '衡水', '衡阳', '红河', '呼和浩特', '呼伦贝尔', '湖州', '葫芦岛', '怀化', '淮安', '淮北', '淮南', '黄冈', '黄南', '黄山', '黄石', '惠州'],
    j: ['鸡西', '吉安', '吉林', '济南', '济宁', '佳木斯', '嘉兴', '嘉峪关', '江门', '焦作', '揭阳', '金昌', '金华', '锦州', '晋城', '晋中', '荆门', '荆州', '景德镇', '九江', '酒泉'],
    k: ['喀什', '开封', '克拉玛依', '克孜勒苏', '昆明'],
    l: ['拉萨', '来宾', '莱芜', '兰州', '廊坊', '乐山', '丽江', '丽水', '连云港', '凉山', '辽阳', '辽源', '聊城', '林芝', '临沧', '临汾', '临夏', '临沂', '柳州', '六安', '六盘水', '龙岩', '陇南', '娄底', '泸州', '洛阳', '吕梁'],
    m: ['马鞍山', '茂名', '眉山', '梅州', '绵阳', '牡丹江'],
    n: ['那曲', '南昌', '南充', '南京', '南宁', '南平', '南通', '南阳', '内江', '宁波', '宁德', '怒江'],
    p: ['攀枝花', '盘锦', '平顶山', '平凉', '萍乡', '莆田', '濮阳', '普洱'],
    q: ['七台河', '齐齐哈尔', '潜江', '钦州', '秦皇岛', '青岛', '清远', '庆阳', '曲靖', '衢州', '泉州'],
    r: ['日喀则', '日照'],
    s: ['三门峡', '三明', '三亚', '山南', '汕头', '汕尾', '商洛', '商丘', '上海', '上饶', '韶关', '邵阳', '绍兴', '深圳', '沈阳', '十堰', '石家庄', '石嘴山', '双鸭山', '朔州', '四平', '松原', '苏州', '宿迁', '宿州', '绥化', '随州'],
    t: ['塔城', '台州', '太原', '泰安', '泰州', '唐山', '天津', '天水', '铁岭', '通化', '通辽', '铜川', '铜陵', '铜仁'],
    w: ['威海', '潍坊', '渭南', '温州', '乌海', '乌兰察布', '乌鲁木齐', '无锡', '吴忠', '芜湖', '梧州', '武汉', '武威'],
    x: ['西安', '西宁', '西双版纳', '锡林郭勒盟', '厦门', '咸宁', '咸阳', '湘潭', '湘西', '襄阳', '孝感', '忻州', '新乡', '新余', '信阳', '兴安盟', '邢台', '徐州', '许昌', '宣城'],
    y: ['雅安', '烟台', '延安', '延边', '盐城', '扬州', '阳江', '阳泉', '伊春', '伊犁', '宜宾', '宜昌', '宜春', '益阳', '银川', '营口', '永州', '榆林', '玉林', '玉溪', '岳阳', '云浮', '运城'],
    z: ['枣庄', '湛江', '张家界', '张家口', '张掖', '漳州', '昭通', '肇庆', '镇江', '郑州', '中山', '中卫', '舟山', '周口', '株洲', '珠海', '驻马店', '资阳', '淄博', '自贡', '遵义']
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h2>城市选择示例</h2>
      <CitySelect dataSource={cityList} onChange={handleCityChange} />
      {selectedCity && <p>您选择的城市是：{selectedCity}</p>}
    </div>
  );
};

export default CitySelectExample;
