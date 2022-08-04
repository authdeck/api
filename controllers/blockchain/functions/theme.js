export default async (txns, theme_map) => {
    try {
        let res_map = new Object();

        txns.forEach((item, index) => {
            for(const theme in theme_map) {
                // theme_map[theme] --> array of contract addresses
                if(theme_map[theme].indexOf(item.to_address) > -1) {
                    if(res_map[theme_map[theme]][item.to_address] != undefined) {
                        res_map[theme_map[theme]][item.to_address] = res_map[theme_map[theme]][item.to_address] + 1 
                    } else {
                        res_map[theme_map[theme]][item.to_address] = 1
                    }
                }
            }
        });

        return res_map;
    } catch (error) {
        return null
    }
}